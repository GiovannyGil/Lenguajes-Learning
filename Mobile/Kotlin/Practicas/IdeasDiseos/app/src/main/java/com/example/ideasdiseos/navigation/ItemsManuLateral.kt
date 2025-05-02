package com.example.ideasdiseos.navigation

import androidx.annotation.DrawableRes
import com.example.ideasdiseos.R

sealed class ItemsManuLateral (
    @DrawableRes val icon: Int,
    val title: String,
    val ruta: String
) {
    data object item_1: ItemsManuLateral(
        R.drawable.home,
        "Home",
        "Home"
    )
}