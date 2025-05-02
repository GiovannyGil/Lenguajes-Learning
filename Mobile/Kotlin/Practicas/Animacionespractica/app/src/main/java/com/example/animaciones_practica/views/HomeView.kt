package com.example.animaciones_practica.views

import android.icu.lang.UCharacter.VerticalOrientation
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DrawerState
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.animaciones_practica.components.ContentHomeView
import com.example.animaciones_practica.components.MenuLateral
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.style.TextMotion

@Composable
fun HomeView(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    MenuLateral(navController, drawerState) {
        ContentHomeView(drawerState, "PRINCIPAL")
        Spacer(modifier = Modifier.padding(50.dp))
        Contenido(texto = "HOME")
    }
}


@Composable
fun Contenido(texto: String) {
    // Variable para la animación
    val infiniteTransition = rememberInfiniteTransition(label = texto)
    val offsetX by infiniteTransition.animateFloat(
        initialValue = 100f, // donde inicia la linea
        targetValue = 900f, // donde termina la linea
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 3000), // tiempo de transision
            repeatMode = RepeatMode.Restart // tipo de "repeticion"
        ), label = texto
    )

    // animacion del texto
    val inifiniteTransition = rememberInfiniteTransition(label ="infinite transition")
    val scale by inifiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 8f,
        animationSpec = infiniteRepeatable(tween(1000), RepeatMode.Reverse),
        label = "scale"
    )

    // Composable que centra el contenido
    Box(
        modifier = Modifier
            .fillMaxSize()
    ) {
        // Texto centrado
        Text(
            text = texto,
            fontSize = 15.sp,
            fontWeight = FontWeight.Bold,
            color = Color.Black,
            textAlign = TextAlign.Center,
            modifier = Modifier
                .graphicsLayer {
                    scaleX = scale
                    scaleY = scale
                    transformOrigin = TransformOrigin.Center
                }
                .align(Alignment.Center),
            style = LocalTextStyle.current.copy(textMotion = TextMotion.Animated)
        )

        // Línea horizontal debajo del texto que se mueve de izquierda a derecha
        Canvas(
            modifier = Modifier
                .align(Alignment.Center)
                .offset(y = 55.dp) // Espacio debajo del texto
                .size(400.dp, 2.dp)
        ) {
            drawLine(
                color = Color.Black,
                start = androidx.compose.ui.geometry.Offset(offsetX, 0f),
                end = androidx.compose.ui.geometry.Offset(offsetX + 100f, 0f),
                strokeWidth = 5f
            )
        }
    }
}

