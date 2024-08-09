package com.example.practica_todo_crud

import BottomNavExample
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import com.example.practica_todo_crud.navigation.NavManager
import com.example.practica_todo_crud.ui.theme.PracticaTODOCRUDTheme
import com.example.practica_todo_crud.viewModel.LoginViewModel
import com.example.practica_todo_crud.viewModel.TareasViewModel
import com.example.practica_todo_crud.views.HomeView

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val loginVM: LoginViewModel by viewModels()
        val tareasVM: TareasViewModel by viewModels()


        setContent {
            PracticaTODOCRUDTheme {
                    //LoginView()
                    //HomeView()
                    //NavManager(loginVM, tareasVM)
                BottomNavExample()
            }
        }
    }
}