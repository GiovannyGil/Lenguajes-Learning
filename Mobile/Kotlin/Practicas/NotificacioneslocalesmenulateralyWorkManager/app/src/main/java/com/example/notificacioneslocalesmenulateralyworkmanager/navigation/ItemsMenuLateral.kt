package com.example.notificacioneslocalesmenulateralyworkmanager.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Home
import androidx.compose.ui.graphics.vector.ImageVector

sealed class ItemsMenuLateral (
    val icon: ImageVector,
    val title: String,
    val ruta: String
) {
    data object item_1 : ItemsMenuLateral(
        Icons.Default.Home,
        "Home",
        "Home"
    )data object item_2 : ItemsMenuLateral(
        Icons.Default.CheckCircle,
        "About",
        "About"
    )data object item_3 : ItemsMenuLateral(
        Icons.Default.AccountBox,
        "Account",
        "Account"
    )
}