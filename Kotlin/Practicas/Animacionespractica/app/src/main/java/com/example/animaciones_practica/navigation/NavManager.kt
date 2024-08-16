package com.example.animaciones_practica.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.animaciones_practica.views.ButtonsView
import com.example.animaciones_practica.views.CardsView
import com.example.animaciones_practica.views.FooterView
import com.example.animaciones_practica.views.HeadView
import com.example.animaciones_practica.views.HomeView
import com.example.animaciones_practica.views.SlideView

@Composable
fun NavManager() {
    val navController = rememberNavController()


    NavHost(navController, startDestination = "Home"){
        composable("Home") {
            HomeView(navController)
        }
        composable("Buttons") {
            ButtonsView(navController)
        }
        composable("Cards") {
            CardsView(navController)
        }
        composable("Head") {
            HeadView(navController)
        }
        composable("Footer") {
            FooterView(navController)
        }
        composable("Slide") {
            SlideView(navController)
        }
    }
}