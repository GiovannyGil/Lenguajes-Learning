package com.example.notificacioneslocalesmenulateralyworkmanager.components

import androidx.compose.material3.DrawerState
import androidx.compose.material3.Icon
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.NavigationDrawerItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.navigation.NavController
import com.example.notificacioneslocalesmenulateralyworkmanager.navigation.ItemsMenuLateral.*
import kotlinx.coroutines.launch

@Composable
fun MenuLateral(
    navController: NavController,
    drawerState: DrawerState,
    content: @Composable () -> Unit
) {
    val scope = rememberCoroutineScope()

    val menuItems = listOf(
        item_1,
        item_2,
        item_3
    )


    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                menuItems.forEach{item ->
                NavigationDrawerItem(
                    icon = { Icon(item.icon, contentDescription = "")},
                    label = { Text(text = item.title)},
                    selected = false,
                    onClick = {
                        scope.launch {
                            drawerState.close() // cerrar
                        }
                        navController.navigate((item.ruta))
                    }
                )
                }
            }
        }) {
        content()        
    }
    
}

