package com.example.practica_todo_crud.views.Tareas

import ElegantFormCard
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.practica_todo_crud.R
import com.example.practica_todo_crud.viewModel.TareasViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Tareas(navController: NavController, tareasVM: TareasViewModel) {
    Scaffold(
        topBar = { TopAppBar(title = { Text(text = "TAREAS") },
            navigationIcon = {

            },
            actions = {
                IconButton(onClick = {
                    //notesVM.signOut() // salir
                    //navController.popBackStack() // salir
                }) {
                    Icon(painter = painterResource(R.drawable.logout), contentDescription = "")
                }
            }
        )
        }
    ) {innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .padding(10.dp),

            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            ElegantFormCard( title = "", desc = "", estado = false) {}
        }

    }
}