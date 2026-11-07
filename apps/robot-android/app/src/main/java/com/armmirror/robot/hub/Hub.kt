// Embedded HTTP + WebSocket server (replaces the Termux Node server). Static hosting of the
// operator bundle and signaling relay only; no business logic.
//
//   GET  /                   tiny links page
//   GET  /operator/…         the Vite build, packaged under assets/web/
//   WS   /signal?role=operator   one operator at a time; the robot peer lives in this process
package com.armmirror.robot.hub

import com.armmirror.robot.protocol.peerJson
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpStatusCode
import io.ktor.http.decodeURLPart
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.cio.CIO
import io.ktor.server.engine.embeddedServer
import io.ktor.server.request.path
import io.ktor.server.request.queryString
import io.ktor.server.response.header
import io.ktor.server.response.respondBytes
import io.ktor.server.response.respondRedirect
import io.ktor.server.response.respondText
import io.ktor.server.routing.get
import io.ktor.server.routing.param
import io.ktor.server.routing.route
import io.ktor.server.routing.routing
import io.ktor.server.websocket.DefaultWebSocketServerSession
import io.ktor.server.websocket.WebSockets
import io.ktor.server.websocket.webSocket
import io.ktor.websocket.CloseReason
import io.ktor.websocket.Frame
import io.ktor.websocket.close
import io.ktor.websocket.readText
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.launch

const val HUB_PORT = 8080

private val MIME = mapOf(
    "html" to "text/html; charset=utf-8",
    "js" to "text/javascript; charset=utf-8",
    "css" to "text/css; charset=utf-8",
    "json" to "application/json",
    "map" to "application/json",
    "svg" to "image/svg+xml",
    "png" to "image/png",
    "wasm" to "application/wasm",
    "urdf" to "application/xml",
)

private const val ROOT_PAGE = """<!doctype html><title>Clawitzer</title><p><a href="/operator/">operator</a></p>"""

/**
 * @param read returns the bytes of a static file by relative path (e.g. "operator/index.html"), or null.
 * @param onSignal receives operator → robot signaling text, plus a synthetic `peer present:false` when the operator leaves.
 */
class Hub(private val read: (String) -> ByteArray?, private val onSignal: (String) -> Unit) {
    private class Operator(val session: DefaultWebSocketServerSession, val out: Channel<String>)

    @Volatile private var operator: Operator? = null

    /** Robot → operator signaling. Queued unbounded so trickle-ICE bursts are never dropped. */
    fun sendToOperator(text: String) {
        operator?.out?.trySend(text)
    }

    fun start(port: Int = HUB_PORT) {
        embeddedServer(CIO, port = port, host = "0.0.0.0") { install(this) }.start(wait = false)
    }

    fun install(app: Application) = with(app) {
        install(WebSockets)
        routing {
            route("/signal") {
                param("role", "operator") {
                    webSocket { serveOperator(this) }
                }
            }
            get("{...}") { serveStatic(call) }
        }
    }

    private suspend fun serveOperator(ws: DefaultWebSocketServerSession) {
        val me = Operator(ws, Channel(Channel.UNLIMITED))
        val old = synchronized(this) { operator.also { operator = me } }
        old?.session?.close(CloseReason(4000, "replaced by a newer connection"))
        val pump = ws.launch { for (t in me.out) ws.send(Frame.Text(t)) }
        // The robot is in-process, so it is always present: the operator offers right away.
        me.out.trySend(peerJson("robot", true))
        try {
            for (frame in ws.incoming) if (frame is Frame.Text) onSignal(frame.readText())
        } finally {
            pump.cancel()
            val wasCurrent = synchronized(this) { (operator === me).also { if (it) operator = null } }
            if (wasCurrent) onSignal(peerJson("operator", false))
        }
    }

    private suspend fun serveStatic(call: io.ktor.server.application.ApplicationCall) {
        val path = runCatching { call.request.path().decodeURLPart() }.getOrElse {
            return call.respondText("bad path", status = HttpStatusCode.BadRequest)
        }
        if (path == "/") return call.respondText(ROOT_PAGE, ContentType.parse("text/html; charset=utf-8"))
        val rel = path.trimStart('/')
        if (rel.split('/').any { it == ".." || it == "." }) {
            return call.respondText("forbidden", status = HttpStatusCode.Forbidden)
        }
        val file = if (rel.endsWith("/")) "${rel}index.html" else rel
        val bytes = read(file)
        if (bytes == null) {
            if (!rel.endsWith("/") && read("$rel/index.html") != null) {
                val q = call.request.queryString().let { if (it.isEmpty()) "" else "?$it" }
                return call.respondRedirect("/$rel/$q", permanent = true)
            }
            return call.respondText("not found: $path\n(run npm run build, then rebuild the app)", status = HttpStatusCode.NotFound)
        }
        val mime = MIME[file.substringAfterLast('.', "")] ?: "application/octet-stream"
        call.response.header(HttpHeaders.CacheControl, "no-cache")
        call.respondBytes(bytes, ContentType.parse(mime))
    }
}
