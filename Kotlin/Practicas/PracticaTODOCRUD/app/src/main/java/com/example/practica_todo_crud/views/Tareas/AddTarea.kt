package com.example.practica_todo_crud.views.Tareas

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavController
import com.example.practica_todo_crud.viewModel.TareasViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddTarea(navController: NavController, tareasVM: TareasViewModel) {
    var title by remember { mutableStateOf("") }
    var note by remember { mutableStateOf("") }
    val context = LocalContext.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = "Nueva Nota")},
                navigationIcon = {
                    IconButton(onClick = {
                       // navController.popBackStack()
                    }) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = ""
                        )
                    }
                },
                // botones al lado derecho
                actions = {
                    IconButton(onClick = {
                        //notesVM.saveNewNote(title, note){
                          //  Toast.makeText(context, "Guardo", Toast.LENGTH_SHORT).show()
                            //navController.popBackStack()
                        //}
                    }) {
                        Icon(
                            imageVector = Icons.Default.AddCircle,
                            contentDescription = ""
                        )
                    }
                }
            )
        }
    ) {}
}