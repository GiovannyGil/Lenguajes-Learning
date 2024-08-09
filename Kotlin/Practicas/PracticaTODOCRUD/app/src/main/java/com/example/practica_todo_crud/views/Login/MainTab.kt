package com.example.practica_todo_crud.views.Login

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.navigation.NavController
import com.example.practica_todo_crud.viewModel.LoginViewModel

@Composable
fun TabsViews(navController: NavController, loginVM: LoginViewModel) {
    var selectedTab by remember { mutableStateOf(0)}
    val tabs = listOf("Iniciar Sessión", "Registrarse")


}