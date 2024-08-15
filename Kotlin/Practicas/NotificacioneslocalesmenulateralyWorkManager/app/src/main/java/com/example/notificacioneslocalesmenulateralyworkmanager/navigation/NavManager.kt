package com.example.notificacioneslocalesmenulateralyworkmanager.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.notificacioneslocalesmenulateralyworkmanager.views.AboutView
import com.example.notificacioneslocalesmenulateralyworkmanager.views.AcountView
import com.example.notificacioneslocalesmenulateralyworkmanager.views.HomeView

@Composable
fun NavManager() {
    val navController = rememberNavController()

    NavHost(navController, startDestination = "Home"){
        composable("Home"){
            HomeView(navController)
        }
        composable("About"){
            AboutView()
        }
        composable("Account"){
            AcountView()
        }
    }
}