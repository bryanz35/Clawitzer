// Design tokens for the camera screen (design 1c "Marginalia", "Classical" palette resolved to hex).
// One light look: the sheet does not follow system dark mode.
package com.armmirror.robot.ui

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import com.armmirror.robot.R

object Cz {
    val Bg = Color(0xFFF3F2F2)
    val Text = Color(0xFF201F1D)
    val Accent = Color(0xFFB68235)
    val A300 = Color(0xFFFACB8D)
    val A400 = Color(0xFFE1AD66)
    val A600 = Color(0xFFA06F24)
    val A700 = Color(0xFF7D5411)
    val N300 = Color(0xFFD7D3D3)
    val N500 = Color(0xFF9B9797)
    // neutral600 (#7D7979) is not used for text: it fails contrast at 9–10 sp, so those labels use N700.
    val N700 = Color(0xFF605D5D)
    val N800 = Color(0xFF444141)
    val Divider = Text.copy(alpha = 0.16f)
    val Paper = Color(0xFFF3F2F2)
    val PaperTick = Paper.copy(alpha = 0.85f)
    // Drawn as 84% / 82% + backdrop blur; 94% with no blur keeps small text ≥ 4.5:1 over a black feed,
    // and a SurfaceView preview can't be sampled for blur anyway.
    val SheetFill = Bg.copy(alpha = 0.94f)
    val PillFill = Bg.copy(alpha = 0.94f)
    val ShadowInk = Color(0xFF2D2B2B)
}

val OpenSans = FontFamily(
    Font(R.font.open_sans_regular, FontWeight.Normal),
    Font(R.font.open_sans_semibold, FontWeight.SemiBold),
    Font(R.font.open_sans_italic, FontWeight.Normal, FontStyle.Italic),
)

/** Base style for every label: Open Sans with tabular figures. */
val CzText = TextStyle(fontFamily = OpenSans, fontFeatureSettings = "tnum", color = Cz.Text)
