package com.example.practica_todo_crud

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.practica_todo_crud.ui.theme.PracticaTODOCRUDTheme
import com.example.practica_todo_crud.views.Login.HomeView
import com.example.practica_todo_crud.views.Login.LoginView

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PracticaTODOCRUDTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    //LoginView()
                    HomeView()
                }
            }
        }
    }
}