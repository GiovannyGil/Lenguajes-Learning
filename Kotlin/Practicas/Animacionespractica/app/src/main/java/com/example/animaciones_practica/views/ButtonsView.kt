package com.example.animaciones_practica.views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.animaciones_practica.components.ContentHomeView
import com.example.animaciones_practica.components.MenuLateral
import org.intellij.lang.annotations.JdkConstants.HorizontalAlignment

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
        Button(onClick = { /*TODO*/ },
            modifier = Modifier.align(Alignment.Center).padding(35.dp),
            ) {
            Text(text = "PRIMERO", fontWeight = FontWeight.SemiBold)
        }
    }
}