package com.example.animaciones_practica.views

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ElevatedButton
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.internal.enableLiveLiterals
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.animaciones_practica.components.ContentHomeView
import com.example.animaciones_practica.components.MenuLateral
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun ButtonsView(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    MenuLateral(navController, drawerState) {
        ContentHomeView(drawerState, "BUTTONS")
        botones()
    }
}

@Composable
fun botones() {
    // Composable que centra el contenido
    Box(
        modifier = Modifier
            .fillMaxSize()
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {

            ButtonFilled()
            ButtonTonal()
            ButtonOutLine()
            ButtonElevated()
            ButtonText()
            ButtonIcon()

        }
    }
}

// funciones para botones de forma individual

// Boton Filled
@Composable
fun ButtonFilled() {

    // Crear una transición infinita
    val infiniteTransition = rememberInfiniteTransition(label = "")

    // Animar el desplazamiento del gradiente
    val animatedOffset by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 3000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ), label = ""
    )

    // Crear el gradiente animado
    val brush = Brush.linearGradient(
        colors = listOf(Color.Blue, Color.Green, Color.Magenta, Color.Blue),
        start = Offset(-animatedOffset * 1000f, 0f),
        end = Offset(1000f - animatedOffset * 1000f, 1000f)
    )

    Button(
        onClick = { },
        modifier = Modifier
            .padding(20.dp)
            .background(brush, RoundedCornerShape(150.dp)) // Aplicar el gradiente animado al fondo
            .border (
                0.dp, Color.Transparent, shape = RoundedCornerShape(25.dp),
                ),
        colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent) // Fondo del botón transparente
    ) {
        Text("Filled", color = Color.White) // Cambiar color del texto si es necesario
    }
}
@Composable
fun ButtonTonal(){
    FilledTonalButton(onClick = {  },
        modifier = Modifier
            .padding(15.dp),) {
        Text("Tonal")
    }
}

@Composable
fun ButtonOutLine(){
    // Crear una transición infinita
    val infiniteTransition = rememberInfiniteTransition(label = "")

    // Animar el desplazamiento del gradiente
    val animatedOffset by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 3000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ), label = ""
    )

    // Crear el gradiente circular animado
    val brush = Brush.linearGradient(
        colors = listOf(Color.Blue, Color.Green, Color.Magenta, Color.Blue),
        start = Offset(-animatedOffset * 1000f, -animatedOffset * 1000f),
        end = Offset(1000f - animatedOffset * 1000f, 1000f - animatedOffset * 1000f)
    )

    // Usar Canvas para dibujar el borde con el gradiente animado
        OutlinedButton(
            onClick = { },
            modifier = Modifier
                    .padding(20.dp),
                border = BorderStroke(2.dp, brush) // Aplicar el gradiente animado al borde

        ) {
            Text("Outlined")
        }

}
@Composable
fun ButtonElevated(){
    // varaible para rastrear el estado de si el botón está "flotando" o no
    var isFloating by remember {
        mutableStateOf(false)
    }

    // corutina para manejar la animación de retorno
    val scope = rememberCoroutineScope()

    // animación para el tamaño del boton (aumenta un 20% al estar flotando)
    val size by animateDpAsState(
        targetValue = if (isFloating) 80.dp else 50.dp, // El tamaño cambia cuando el botón está "flotando"
        animationSpec = tween(durationMillis = 300) // Duración de la animación de cambio de tamaño
    )

    // animación para la elevacion del botón (aumenta al estar flotando)
    val elevation by animateDpAsState(
        targetValue = if (isFloating) 20.dp else 4.dp, // La elevación cambia cuando el botón está "flotando"
        animationSpec = tween(durationMillis = 300) // Duración de la animación de cambio de elevación
    )

    // Animación para el tamaño de la fuente (aumenta y disminuye junto con el tamaño del botón)
    val fontSize by animateFloatAsState(
        targetValue = if (isFloating) 24f else 18f, // El tamaño de la fuente cambia cuando el botón está "flotando"
        animationSpec = tween(durationMillis = 300) // Duración de la animación de cambio de tamaño de fuente
    )

    ElevatedButton(
        onClick = {
            isFloating = true // activar el boton "flotante"
            scope.launch {
                delay(500) // esperar 3 seg
                isFloating = false // volver al estado original despues de 3 seg
            }
        },
        elevation = ButtonDefaults.elevatedButtonElevation(defaultElevation = elevation),
                modifier = Modifier.padding (10.dp),
    ) {
        Text("Elevated", fontWeight = FontWeight.Bold, fontSize = fontSize.sp,
            modifier = Modifier.padding(all = size / 20))
    }
}

@Composable
fun ButtonText(){
    TextButton( onClick = {  },
        modifier = Modifier
            .padding(15.dp)
        , ) {
        Text("Text Button")
    }
}

@Composable
fun ButtonIcon() {
    // Define the size state for the button
    var size by remember { mutableStateOf(70.dp) } // Default size of the button
    var isPressed by remember { mutableStateOf(false) } // State to track if button is pressed

    // Animate the size of the button
    val animatedSize by animateDpAsState(
        targetValue = size,
        animationSpec = spring(
            dampingRatio = 0.5f,
            stiffness = 300f
        )
    )

    // Handle button press to trigger animation sequence
    LaunchedEffect(isPressed) {
        if (isPressed) {
            // First animation: Increase size by 20%
            size = size * 1.2f
            delay(150) // Duration of the first animation

            // Return to original size
            size = size / 1.2f
            delay(150) // Duration for returning to original size

            // Second animation: Increase size by 10%
            size = size * 1.1f
            delay(100) // Duration of the second animation

            // Return to original size
            size = size / 1.1f
            delay(100) // Duration for returning to original size

            // Reset the pressed state
            isPressed = false
        }
    }

    IconButton(onClick = {
        isPressed = true // Set the pressed state to trigger animation
    },
        modifier = Modifier
            .size(animatedSize)
    ) {
        Icon(
            imageVector = Icons.Default.AccountCircle,
            contentDescription = "",
            modifier = Modifier.size(animatedSize) // Ensure icon scales with button
        )
    }
}
