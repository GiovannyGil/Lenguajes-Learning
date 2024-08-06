package com.example.firebasenotes

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.firebasenotes.navigation.NavManager
import com.example.firebasenotes.ui.theme.FireBaseNotesTheme
import com.example.firebasenotes.viewModel.LoginViewModel
import com.example.firebasenotes.viewModel.NotesViewModel
import com.example.firebasenotes.views.Login.TabsView

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val loginVM : LoginViewModel by viewModels()
        val notesVM : NotesViewModel by viewModels()

        setContent {
            FireBaseNotesTheme {
                NavManager(loginVM, notesVM)
            }
        }
    }
}
