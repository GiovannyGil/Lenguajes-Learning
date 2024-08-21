package com.example.animaciones_practica.views

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.animaciones_practica.components.ContentHomeView
import com.example.animaciones_practica.components.MenuLateral
import com.example.animaciones_practica.components.TopBar
import com.example.animaciones_practica.navigation.ItemsManuLateral

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun HeadView(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)

    val navController = rememberNavController()
    var selectedTab by remember { mutableIntStateOf(0) }

    MenuLateral(navController, drawerState) {
        ContentHomeView(drawerState, "TOPBAR")
        Scaffold(
            topBar = {
                TopAppBarWithTabs(navController, selectedTab) { index ->
                    selectedTab = index
                }
            }
        ) { innerPadding ->
            NavHost(
                navController = navController,
                startDestination = "Home",
                modifier = Modifier.padding(innerPadding)
            ) {
                composable("Home") { HomeView(navController) }
                composable("Buttons") { ButtonsView(navController) }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun TopAppBarWithTabs(navController: NavController, selectedTab: Int, onTabSelected: (Int) -> Unit) {
    // obtener los "link" de las vistas
    val menuItems = listOf(
        ItemsManuLateral.item_1,
        ItemsManuLateral.item_2,
    )

    Column {
        TopAppBar(
            title = { Text(text = "My TopBar with Tabs") },
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = MaterialTheme.colorScheme.primary,
                titleContentColor = Color.White
            )
        )

        TabRow(selectedTabIndex = selectedTab) {
            menuItems.forEachIndexed { index, item ->
                Tab(
                    selected = selectedTab == index,
                    onClick = {
                        onTabSelected(index)
                        navController.navigate(item.ruta) {
                            popUpTo(navController.graph.startDestinationId) { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    },
                    text = { Text(item.title) },
                    icon = { Icon(painter = painterResource(id = item.icon), contentDescription = item.title) }
                )
            }
        }
    }
}