package com.example.intentsapp.views

import android.annotation.SuppressLint
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.navigation.compose.rememberNavController
import com.example.intentsapp.components.BottonNav
import com.example.intentsapp.navegation.NavManager
import com.example.intentsapp.navegation.Routes

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun HomeView() {
    val navController= rememberNavController()
    val navigationRoutes = listOf(
        Routes.PhoneView,
        Routes.SmsView,
        Routes.EmailView
    )


    Scaffold(
        bottomBar = {
            BottonNav(navController, navigationRoutes )
        }
    ) {
    NavManager(navController)
    }
}