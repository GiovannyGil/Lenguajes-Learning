package com.example.animaciones_practica.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.DrawerState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable()
fun TopBar(
    drawerState: DrawerState,
    title: String
) {
    val scope = rememberCoroutineScope()
    CenterAlignedTopAppBar(title = { Text(text = title) },
            navigationIcon = {
                IconButton(onClick = {
                    scope.launch {
                        drawerState.open()  // abrir menu
                    }
                }) {
                    Icon(Icons.Default.Menu, contentDescription = "") // icono del menu
                }
            }
        )
}