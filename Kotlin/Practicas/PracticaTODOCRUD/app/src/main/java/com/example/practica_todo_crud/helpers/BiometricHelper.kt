package com.example.practica_todo_crud.helpers

import android.app.KeyguardManager
import android.content.Context
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity

object BiometricHelper {

    fun canAuthenticateWithBiometrics(context: Context): Boolean {
        val keyguardManager = context.getSystemService(KeyguardManager::class.java)
        return keyguardManager.isDeviceSecure
    }

    fun createBiometricPrompt(
        activity: FragmentActivity,
        onSuccess: () -> Unit,
        onFailure: () -> Unit
    ): BiometricPrompt {
        val executor = ContextCompat.getMainExecutor(activity)
        return BiometricPrompt(activity, executor, object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                super.onAuthenticationSucceeded(result) // Llama a onSuccess si la autenticación es exitosa
                onSuccess()
            }

            override fun onAuthenticationFailed() {
                super.onAuthenticationFailed() //  Llama a onFailure si la autenticación falla
                onFailure()
            }
        })
    }

    fun buildPromptInfo(): BiometricPrompt.PromptInfo {
        return BiometricPrompt.PromptInfo.Builder()
            .setTitle("Iniciar sesión")
            .setSubtitle("Utiliza tu huella para iniciar sesión")
            .setNegativeButtonText("Cancelar")
            .build()
    }
}