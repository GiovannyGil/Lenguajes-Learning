package com.example.ideasdiseos.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.ideasdiseos.vistas.Home

@Composable
fun NavManager() {
    val navController = rememberNavController()

    NavHost(navController, startDestination = "Home"){
        composable("Home"){
            Home(navController)
        }
    }
}