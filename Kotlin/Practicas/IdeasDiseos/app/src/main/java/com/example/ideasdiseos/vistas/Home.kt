package com.example.ideasdiseos.vistas

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.ideasdiseos.componentes.MenuLateral


@Composable
fun Home(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    MenuLateral(navController, drawerState) {
        HomeContent()
    }
}

@Composable
fun HomeContent(){
    Box(modifier = Modifier.background(Color.Red)){

    }
}