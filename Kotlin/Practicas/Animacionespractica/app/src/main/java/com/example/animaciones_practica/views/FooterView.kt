package com.example.animaciones_practica.views

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.List
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.animaciones_practica.R
import com.example.animaciones_practica.components.ContentHomeView
import com.example.animaciones_practica.components.MenuLateral
import com.example.animaciones_practica.navigation.ItemsManuLateral

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun FooterView(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)

    val navController = rememberNavController()
    var selectedItem by remember { mutableIntStateOf(0) }



    MenuLateral(navController, drawerState) {
        ContentHomeView(drawerState, "FOOTER")
        Scaffold(
            bottomBar = {
                ButtomNav(navController, selectedItem) { index ->
                    selectedItem = index
                }
            }
        ) {innerPadding ->
            NavHost(
                navController = navController,
                startDestination = "Home",
                modifier = Modifier.padding(innerPadding)
            ){
                composable("Home") { HomeView(navController) }
                composable("Buttons") { ButtonsView(navController) }
            }

        }
    }
}


@Composable
private fun ButtomNav(navController: NavController, selectedItem: Int, onItemSelected: (Int) -> Unit) {
    // obtener los "link" de las vistas
    val menuItems = listOf(
        ItemsManuLateral.item_1,
        ItemsManuLateral.item_2,
    )

    NavigationBar {
        NavigationBarItem(
            icon = { Image(painter = painterResource(id = ItemsManuLateral.item_1.icon),
                contentDescription = "Login") },
            label = { Text(ItemsManuLateral.item_1.title) },
            selected = selectedItem == 0,
            onClick = {
                onItemSelected(0)
                navController.navigate(ItemsManuLateral.item_1.ruta) {
                    popUpTo(navController.graph.startDestinationId) { saveState = true }
                    launchSingleTop = true
                    restoreState = true
                }
            }
        )
        NavigationBarItem(
            icon = { Icon(painter = painterResource(id = ItemsManuLateral.item_2.icon), contentDescription = "Register") },
            label = { Text(ItemsManuLateral.item_2.title) },
            selected = selectedItem == 1,
            onClick = {
                onItemSelected(1)
                navController.navigate(ItemsManuLateral.item_2.ruta) {
                    popUpTo(navController.graph.startDestinationId) { saveState = true }
                    launchSingleTop = true
                    restoreState = true
                }
            }
        )
    }
}