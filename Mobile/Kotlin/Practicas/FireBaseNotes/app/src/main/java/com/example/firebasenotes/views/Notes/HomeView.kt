package com.example.firebasenotes.views.Notes

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ExitToApp
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.navigation.NavController
import com.example.firebasenotes.components.CardNote
import com.example.firebasenotes.viewModel.NotesViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeView(navController: NavController, notesVM: NotesViewModel) {

    LaunchedEffect(Unit) {
        // llamar la funcion de mostrar todos los registros
        notesVM.fetchNotes()
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text(text = "MIS NOTAS") },
            navigationIcon = {
                IconButton(onClick = {
                    notesVM.signOut() // salir
                    navController.popBackStack() // salir
                }) {
                Icon(imageVector = Icons.Default.ExitToApp, contentDescription = "")
            }
            },
            actions = {
                IconButton(onClick = {
                    navController.navigate("AddNoteView") // ir a agregar
                }) {
                    Icon(imageVector = Icons.Default.Add, contentDescription = "")
                }
            }
            )
        }
    ) {pad ->
        Column(modifier = Modifier.padding(pad),
            horizontalAlignment = Alignment.CenterHorizontally)
        {
            // mostrar los registros
            val datos by notesVM.notesData.collectAsState()

            LazyColumn {
                items(datos) { item ->
                    CardNote(title = item.title, note = item.note, date = item.date, onClick = {
                        navController.navigate("EditNoteView/${item.idDoc}")
                    }) {
                        navController.navigate("photoView/${item.idDoc}")
                    }
                }
            }
        }
    }
}