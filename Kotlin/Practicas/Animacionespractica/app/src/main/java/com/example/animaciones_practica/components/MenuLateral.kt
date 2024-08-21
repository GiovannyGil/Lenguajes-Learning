package com.example.animaciones_practica.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Divider
import androidx.compose.material3.DrawerState
import androidx.compose.material3.Icon
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.NavigationDrawerItem
import androidx.compose.material3.Text
import androidx.compose.material3.contentColorFor
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.animaciones_practica.navigation.ItemsManuLateral
import kotlinx.coroutines.launch

@Composable
fun MenuLateral(
    navController: NavController,
    drawerState: DrawerState,
    content: @Composable () -> Unit
) {
    //
    val scope = rememberCoroutineScope()

    // obtener los "link" de las vistas
    val menuItems = listOf(
        ItemsManuLateral.item_1,
        ItemsManuLateral.item_2,
        ItemsManuLateral.item_3,
        ItemsManuLateral.item_4,
        ItemsManuLateral.item_5,
        ItemsManuLateral.item_6,
        ItemsManuLateral.item_7,
    )

    // menu
    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
        ModalDrawerSheet(
            modifier = Modifier
                .width(275.dp)
            ,
        ) {
            Text(text = "Menu Lateral",
                textAlign = TextAlign.Center,

            )

            Divider()

            // recorrer los items del menu para mostrarlos
            menuItems.forEach{ item ->
                NavigationDrawerItem(
                    modifier = Modifier
                        .padding(3.dp),
                    icon = { Image(
                        painter = painterResource(id = item.icon),
                        contentDescription = "Icono" // Descripción del icono
                    )}, // icono
                    label = { Text(text = item.title, fontWeight = FontWeight.Bold, color = Color.Black) }, // nombre de la vista
                    selected = false,  // estado
                    onClick = {  // accion
                        scope.launch {
                            drawerState.close() // cerrar el menu
                        }
                        navController.navigate((item.ruta)) // redirigir a la vista
                    })

            }
        }
    }) {
        content()
    }
}