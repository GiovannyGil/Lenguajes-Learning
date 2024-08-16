package com.example.animaciones_practica.components

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.DrawerState
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable

@Composable
fun ContentHomeView(drawerState: DrawerState, Titulo: String) {
    Scaffold(
        topBar = {
            TopBar(drawerState = drawerState, title = Titulo)
        }
    ) {
            pad ->
        // importar funciones/componentes
        contenido(pad)
    }
}

@Composable
fun contenido(paddingValues: PaddingValues){

}