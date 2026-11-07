package com.armmirror.robot.hub

import com.armmirror.robot.protocol.peerJson
import io.ktor.client.plugins.websocket.WebSockets
import io.ktor.client.plugins.websocket.webSocketSession
import io.ktor.client.request.get
import io.ktor.client.statement.bodyAsText
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.testApplication
import io.ktor.websocket.Frame
import io.ktor.websocket.close
import io.ktor.websocket.readText
import kotlinx.coroutines.delay
import kotlinx.coroutines.withTimeout
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.util.concurrent.CopyOnWriteArrayList

class HubTest {
    private val files = mapOf(
        "operator/index.html" to "<html>op</html>",
        "operator/assets/a.js" to "console.log(1)",
    )
    private val signals = CopyOnWriteArrayList<String>()
    private val hub = Hub(read = { files[it]?.toByteArray() }, onSignal = { signals += it })

    @Test fun staticRouting() = testApplication {
        application { hub.install(this) }
        val http = createClient { followRedirects = false }

        assertTrue(http.get("/").bodyAsText().contains("/operator/"))

        val redirect = http.get("/operator?emulate=1")
        assertEquals(HttpStatusCode.MovedPermanently, redirect.status)
        assertEquals("/operator/?emulate=1", redirect.headers[HttpHeaders.Location])

        val index = http.get("/operator/")
        assertEquals("<html>op</html>", index.bodyAsText())
        assertTrue(index.headers[HttpHeaders.ContentType]!!.startsWith("text/html"))
        assertEquals("no-cache", index.headers[HttpHeaders.CacheControl])

        assertTrue(http.get("/operator/assets/a.js").headers[HttpHeaders.ContentType]!!.startsWith("text/javascript"))
        assertEquals(HttpStatusCode.NotFound, http.get("/nope").status)
        assertEquals(HttpStatusCode.Forbidden, http.get("/operator/%2E%2E/secret").status)
    }

    @Test fun signaling() = testApplication {
        application { hub.install(this) }
        val ws = createClient { install(WebSockets) }

        val first = ws.webSocketSession("/signal?role=operator")
        assertEquals(peerJson("robot", true), (first.incoming.receive() as Frame.Text).readText())

        first.send(Frame.Text("""{"t":"offer","sdp":"x"}"""))
        hub.sendToOperator("""{"t":"answer","sdp":"y"}""")
        assertEquals("""{"t":"answer","sdp":"y"}""", (first.incoming.receive() as Frame.Text).readText())
        withTimeout(2000) { while (signals.isEmpty()) delay(10) }
        assertEquals("""{"t":"offer","sdp":"x"}""", signals[0])

        // A newer operator replaces the old one with close code 4000; no "left" signal for the replaced one.
        val second = ws.webSocketSession("/signal?role=operator")
        assertEquals(peerJson("robot", true), (second.incoming.receive() as Frame.Text).readText())
        assertEquals(4000.toShort(), first.closeReason.await()?.code)

        second.close()
        withTimeout(2000) { while (signals.size < 2) delay(10) }
        assertEquals(listOf(peerJson("operator", false)), signals.drop(1))
    }

    @Test fun rejectsOtherRoles() = testApplication {
        application { hub.install(this) }
        assertEquals(HttpStatusCode.NotFound, client.get("/signal?role=robot").status)
    }
}
