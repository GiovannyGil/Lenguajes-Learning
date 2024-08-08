package com.example.practica_todo_crud.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import kotlinx.coroutines.launch

class LoginViewModel: ViewModel() {
    private val auth: FirebaseAuth = Firebase.auth
    var showAlert by mutableStateOf(false)

    // funcion de logeo
    fun login(email: String, password: String, onSucces: () -> Unit){
        viewModelScope.launch {
            try {
                auth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if(task.isSuccessful) {
                            onSucces()
                        } else {
                            Log.d("ERROR EN FIREBASE", "Usuario y Contraseña Incorrectos")
                            showAlert = true
                        }
                    }
            } catch (e: Exception) {
                Log.d("ERROR en JETPACK", "ERROR: ${e.localizedMessage}")
            }
        }
    }

    fun closeAlert() {
        showAlert = false
    }

}