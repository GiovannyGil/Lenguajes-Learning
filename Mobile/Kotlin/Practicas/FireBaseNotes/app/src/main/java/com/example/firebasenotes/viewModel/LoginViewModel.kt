package com.example.firebasenotes.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.firebasenotes.model.UserModel
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.Dispatchers
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


    // funcion de crear usuario
    fun CreateUser(email: String, password: String, username: String, onSucces: () -> Unit){
        viewModelScope.launch {
            try {
                auth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if(task.isSuccessful) {
                            saveUser(username) // guarda
                            onSucces() // redirecciona al home -> hace login
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

    // funcion para guardar el nuevo usuario
    private fun saveUser(username: String) {
        val id = auth.currentUser?.uid
        val email = auth.currentUser?.email

        viewModelScope.launch(Dispatchers.IO) {
            val user = UserModel(
                userId = id.toString(),
                email = email.toString(),
                username = username
            )

            // guardar en firebase
            FirebaseFirestore.getInstance().collection("Users")
                .add(user)
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