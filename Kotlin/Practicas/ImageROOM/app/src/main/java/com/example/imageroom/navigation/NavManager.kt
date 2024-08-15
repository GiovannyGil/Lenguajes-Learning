package com.example.imageroom.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.imageroom.viewModel.ImageViewModel
import com.example.imageroom.views.AddPhotoView
import com.example.imageroom.views.HomeView

@Composable
fun NavManager(viewModel: ImageViewModel) {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "Home") {
        composable("Home"){
            HomeView(navController, viewModel)
        }
        composable("AddPhotoView"){
            AddPhotoView(viewModel)
        }
    }
}