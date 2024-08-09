package com.example.practica_todo_crud.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.practica_todo_crud.viewModel.LoginViewModel
import com.example.practica_todo_crud.viewModel.TareasViewModel
import com.example.practica_todo_crud.views.Login.BlankView
import com.example.practica_todo_crud.views.Tareas.AddTarea
import com.example.practica_todo_crud.views.Tareas.Tareas

@Composable
fun NavManager(loginVM: LoginViewModel, tareasVM: TareasViewModel) {
    var navController = rememberNavController()

    NavHost(navController = navController, startDestination = "Blank") {
        composable("Blank") {
            BlankView(navController)
        }
        composable("Login"){

        }
        composable("Home") {
            Tareas(navController, tareasVM)
        }
        composable("AddTareas"){
            AddTarea(navController, tareasVM)
        }
        composable("EditTareas"){

        }
    }
}