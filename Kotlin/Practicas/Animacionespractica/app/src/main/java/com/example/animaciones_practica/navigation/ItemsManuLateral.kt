package com.example.animaciones_practica.navigation

import androidx.annotation.DrawableRes
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.ui.graphics.vector.ImageVector
import com.example.animaciones_practica.R

sealed class ItemsManuLateral(
    @DrawableRes val icon: Int,
    val title: String,
    val ruta: String
) {
    data object item_1: ItemsManuLateral(
        R.drawable.home,
        "Home",
        "Home"
    )
    data object item_2: ItemsManuLateral(
        R.drawable.button,
        "Buttons",
        "Buttons"
    )
    data object item_3: ItemsManuLateral(
        R.drawable.card,
        "Cards",
        "Cards"
    )
    data object item_4: ItemsManuLateral(
        R.drawable.header,
        "Head",
        "Head"
    )
    data object item_5: ItemsManuLateral(
        R.drawable.bottom,
        "Footer",
        "Footer"
    )
    data object item_6: ItemsManuLateral(
        R.drawable.slide,
        "Slide",
        "Slide"
    )
    data object item_7: ItemsManuLateral(
        R.drawable.search,
        "Search",
        "Search"
    )

}