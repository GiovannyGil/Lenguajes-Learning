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
import android.content.Context
import android.content.SharedPreferences
import androidx.biometric.BiometricPrompt
import androidx.fragment.app.FragmentActivity
import com.example.practica_todo_crud.helpers.BiometricHelper
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys
import com.google.firebase.auth.GoogleAuthProvider

class LoginViewModel: ViewModel() {
    private val auth: FirebaseAuth = Firebase.auth
    var showAlert by mutableStateOf(false)
    var isBiometricEnabled by mutableStateOf(false)
    var showBiometricRegistrationDialog by mutableStateOf(false)
    private var alertMessage by mutableStateOf("")

    // Función para obtener las preferencias encriptadas
    private fun getEncryptedSharedPreferences(context: Context): SharedPreferences {
        val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
        return EncryptedSharedPreferences.create(
            "biometric_prefs",
            masterKeyAlias,
            context,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

    // Guardar credenciales de manera segura
    private fun saveEncryptedCredentials(context: Context, email: String, password: String, userId: String) {
        val sharedPreferences = getEncryptedSharedPreferences(context)
        sharedPreferences.edit().apply {
            putString("encrypted_email", email)
            putString("encrypted_password", password) // Guardamos la contraseña de forma segura
            putString("user_id", userId)
            putBoolean("biometric_enabled", true)
            apply()
        }
    }

    // Función para verificar si el usuario tiene biometría habilitada
    fun checkBiometricStatus(context: Context): Boolean {
        val sharedPreferences = getEncryptedSharedPreferences(context)
        return sharedPreferences.getBoolean("biometric_enabled", false)
    }

    // Función para iniciar sesión con correo y contraseña
    fun login(email: String, password: String, context: Context, onSuccess: () -> Unit) {
        viewModelScope.launch {
            try {
                auth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if (task.isSuccessful) {
                            val userId = auth.currentUser?.uid
                            if (userId != null) {
                                // Guardar credenciales si el login es exitoso
                                saveEncryptedCredentials(context, email, password, userId)
                                if (!checkBiometricStatus(context)) {
                                    showBiometricRegistrationDialog = true
                                }
                                onSuccess()
                            }
                        } else {
                            alertMessage = "Usuario y/o Contraseña incorrecta"
                            showAlert = true
                        }
                    }
            } catch (e: Exception) {
                Log.d("ERROR en JETPACK", "ERROR: ${e.localizedMessage}")
            }
        }
    }

    // Función para crear un nuevo usuario
    fun createUsuario(email: String, password: String, nombre: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            try {
                auth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if (task.isSuccessful) {
                            saveUser(nombre)
                            onSuccess()
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

    // Guardar datos del usuario en Firestore
    private fun saveUser(nombre: String) {
        val id = auth.currentUser?.uid
        val email = auth.currentUser?.email

        viewModelScope.launch(Dispatchers.IO) {
            val userData = Usuario(
                userId = id ?: "",
                email = email ?: "",
                nombre = nombre
            )

            FirebaseFirestore.getInstance().collection("UsuariosTarea")
                .add(userData)
                .addOnSuccessListener {
                    Log.d("GUARDO", "Guardo Correctamente")
                }.addOnFailureListener {
                    Log.d("Error al guardar", "ERROR al guardar en firestore")
                }
        }
    }


    // Función para registrar la biometría
    fun registerBiometric(
        context: Context,
        activity: FragmentActivity,
        onSuccess: () -> Unit,
        onFailure: () -> Unit
    ) {
        if (!BiometricHelper.canAuthenticateWithBiometrics(context)) {
            alertMessage = "Este dispositivo no soporta autenticación biométrica"
            showAlert = true
            return
        }

        val biometricPrompt = BiometricHelper.createBiometricPrompt(activity, {
            // Guardar credenciales al registrar biometría exitosamente
            auth.currentUser?.let { user ->
                saveEncryptedCredentials(context, user.email ?: "" ,"defaultPassword",  user.uid)
                onSuccess()
            }
        }, {
            onFailure()
        })

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Registrar huella digital")
            .setSubtitle("Registra tu huella para accesos futuros")
            .setNegativeButtonText("Cancelar")
            .build()

        biometricPrompt.authenticate(promptInfo)
    }

    // Autenticación biométrica
    fun loginWithBiometrics(
        context: Context,
        activity: FragmentActivity,
        onSuccess: () -> Unit,
        onFailure: () -> Unit
    ) {
        if (!checkBiometricStatus(context)) {
            alertMessage = "Primero debes registrar tu huella digital"
            showAlert = true
            return
        }

        val biometricPrompt = BiometricHelper.createBiometricPrompt(activity, {
            // Recuperar credenciales almacenadas
            val sharedPreferences = getEncryptedSharedPreferences(context)
            val email = sharedPreferences.getString("encrypted_email", null)
            val password = sharedPreferences.getString("encrypted_password", null)

            if (email != null && password != null) {
                // Re-autenticar con Firebase usando email y password
                auth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if (task.isSuccessful) {
                            onSuccess()
                        } else {
                            onFailure()
                        }
                    }
            } else {
                alertMessage = "Error al recuperar las credenciales"
                showAlert = true
                onFailure()
            }
        }, {
            onFailure()
        })

        val promptInfo = BiometricHelper.buildPromptInfo()
        biometricPrompt.authenticate(promptInfo)
    }

    // Cerrar alerta
    fun closeAlert() {
        showAlert = false
    }

    // Activar biometría
    fun enableBiometrics() {
        isBiometricEnabled = true
    }

    fun dismissBiometricRegistrationDialog() {
        showBiometricRegistrationDialog = false
    }
}