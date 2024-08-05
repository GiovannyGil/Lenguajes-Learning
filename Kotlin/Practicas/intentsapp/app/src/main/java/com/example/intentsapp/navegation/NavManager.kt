package com.example.intentsapp.navegation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.NavHostController
import androidx.navigation.compose.composable
import com.example.intentsapp.views.EmailView
import com.example.intentsapp.views.PhoneView
import com.example.intentsapp.views.SMSView

@Composable
fun NavManager(navHostController: NavHostController) {
    NavHost(navController = navHostController, startDestination = Routes.PhoneView.route) {
        composable(Routes.PhoneView.route){
            PhoneView()
        }

        composable(Routes.SmsView.route){
            SMSView()
        }

        composable(Routes.EmailView.route){
            EmailView()
        }
    }
}