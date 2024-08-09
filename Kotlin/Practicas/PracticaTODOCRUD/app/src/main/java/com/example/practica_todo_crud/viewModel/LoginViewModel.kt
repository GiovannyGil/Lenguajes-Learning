package com.example.practica_todo_crud.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.practica_todo_crud.model.Usuario
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.math.log

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

    // fun create -> crear nuevo usuario
    fun createUsuario(email: String, password: String, nombre: String, onSucces: () -> Unit) {
        viewModelScope.launch {
            try {
                auth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if(task.isSuccessful) {
                            saveUser(nombre) // guardar -> fun
                            onSucces() // hacer login
                        } else {
                            Log.d("ERROR EN FIREBASE", "Error al crear Usuario")
                            showAlert = true
                        }
                    }
            } catch (e: Exception) {
                Log.d("ERROR en JETPACK", "ERROR: ${e.localizedMessage}")
            }
        }
    }

    // funcion save -> guardr el nuevo usuario
    private fun saveUser(nombre: String) {
        val id = auth.currentUser?.uid
        val email = auth.currentUser?.email

        viewModelScope.launch(Dispatchers.IO) {
            // obtener los datos
            val userData = Usuario(
                userId = id.toString(),
                email = email.toString(),
                nombre = nombre
            )

            // guardar la info del usuario en firebase
            FirebaseFirestore.getInstance().collection("UsuariosTarea")
                .add(userData)
                .addOnSuccessListener {
                    Log.d("GUARDO", "Guardo Correctamente")
                }.addOnFailureListener {
                    Log.d("Error al guardar", "ERROR al guardar en firestore")
                }
        }
    }

    fun closeAlert() {
        showAlert = false
    }

}