package com.example.biomitric_ejemplov1

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricManager.Authenticators.BIOMETRIC_STRONG
import androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL
import androidx.biometric.BiometricPrompt
import androidx.biometric.BiometricPrompt.*
import androidx.biometric.BiometricPrompt.PromptInfo.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import com.example.biomitric_ejemplov1.ui.theme.BiomitricEjemplov1Theme

// cambiar herencia a AppCompatActivity
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BiomitricEjemplov1Theme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Auth(modifier = Modifier.padding(innerPadding))
                }
            }
        }
        //Setup
        setupAuth()
    }


    // Private Funtions

    private var canAuthenticate = false
    private lateinit var promtInfo: PromptInfo


    // funcio para la autenticacion cuando se inicie
    private fun setupAuth() {
        // verificar si el dispositivo admite verificacion biometrica
        if (BiometricManager.from(this).canAuthenticate(
                BiometricManager.Authenticators.BIOMETRIC_STRONG or BiometricManager.Authenticators.DEVICE_CREDENTIAL)
            == BiometricManager.BIOMETRIC_SUCCESS){
            canAuthenticate = true

            promtInfo = BiometricPrompt.PromptInfo.Builder()
                .setTitle("Autenticacion Biometrica")
                .setSubtitle("Autenticacion usando sensor biometrico")
                .setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
                .build()
        }
    }

    // funcion para invocar al precionar el boton "Autenticar"
    private fun authenticate(auth: (auth: Boolean) -> Unit) {
        if (canAuthenticate) {
            BiometricPrompt(this, ContextCompat.getMainExecutor(this),
                object: BiometricPrompt.AuthenticationCallback() {
                    override fun onAuthenticationSucceeded(result: AuthenticationResult) {
                        super.onAuthenticationSucceeded(result)

                        auth(true)
                    }
                }
            ).authenticate(promtInfo)
        } else  {
            auth(true)
        }
    }


// Composables

    @Composable
    fun Auth(modifier: Modifier) {
        var auth by remember { mutableStateOf(false) }
        Column(
            modifier = Modifier
                .background(if (auth) Color.Green else Color.Red)
                .fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(if (auth) "Authenticate" else "No Authenticado", color = Color.White, fontSize = 22.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.padding(8.dp))
            Button(onClick = {
                if(auth) { auth = false } else {
                    authenticate {
                        auth = it
                    }
                }
            }) {
                Text(if(auth) "Cerrar" else "Autenticar", color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.SemiBold)
            }
        }
    }

    @Preview(showBackground = true)
    @Composable
    fun GreetingPreview() {
        BiomitricEjemplov1Theme {
            Auth(modifier = Modifier.padding(16.dp))
        }
    }

}

