package com.example.practica_todo_crud.views.Login

import android.annotation.SuppressLint
import android.view.Gravity
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldColors
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.practica_todo_crud.R
import com.example.practica_todo_crud.components.Alert
import com.example.practica_todo_crud.ui.theme.Pink80
import com.example.practica_todo_crud.ui.theme.Purple80
import com.example.practica_todo_crud.viewModel.LoginViewModel
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import com.example.practica_todo_crud.helpers.BiometricHelper
import androidx.fragment.app.FragmentActivity


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginView(navController: NavController, LoginVM: LoginViewModel) {

    // Dentro de tu función composable
    val context = LocalContext.current
    val biometricHelper = BiometricHelper(context)

    Column(modifier = Modifier
        .fillMaxSize()
        .padding(10.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {

        var email by remember { mutableStateOf("")}
        var password by remember { mutableStateOf("")}

        ElevatedCard(
            modifier = Modifier
                .width(330.dp)
                .height(360.dp)
                .shadow(
                    elevation = 3.dp,
                    shape = RoundedCornerShape(8.dp),
                    clip = true
                ),
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color.LightGray,
                    contentColor = Color.White
                )
            ) {

                Column(modifier = Modifier
                    .fillMaxSize()
                    .padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                Text(text = "Login", fontSize = 32.sp, color = Purple80, fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .padding(10.dp)

                )
                    OutlinedTextField(
                        value = email,
                        label = { Text(text = "email")},
                        onValueChange = {email = it},
                        placeholder = { Text("example@gmail.com") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(start = 30.dp, end = 30.dp),
                    )

                OutlinedTextField(value = password,
                    onValueChange = {password = it},
                    label = { Text(text = "Password")},
                    placeholder = { Text(text = "password") },
                    visualTransformation = PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(start = 30.dp, end = 30.dp)
                )

                Spacer(modifier = Modifier.height(20.dp))


                Button(onClick = {
                    LoginVM.login(email, password){
                        navController.navigate("Home")
                    }
                },
                    modifier = Modifier
                        .padding(start = 30.dp, end = 30.dp)
                ) {
                    Text(text = "Ingresar")
                }

                Row(modifier = Modifier.background(Color.Transparent)) {
                    // todo! iconbutton para logeo con huella
                    IconButton(
                        onClick = {
                            if (biometricHelper.canAuthenticate()) {
                                biometricHelper.authenticate(context as FragmentActivity, object : BiometricPrompt.AuthenticationCallback() {
                                    override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                                        super.onAuthenticationError(errorCode, errString)
                                        // Manejar error de autenticación
                                        Toast.makeText(context, "Error de autenticación: $errString", Toast.LENGTH_SHORT).show()
                                    }

                                    override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                                        super.onAuthenticationSucceeded(result)
                                        // Autenticación exitosa, navegar a Home
                                        navController.navigate("Home")
                                    }

                                    override fun onAuthenticationFailed() {
                                        super.onAuthenticationFailed()
                                        // Manejar autenticación fallida
                                        Toast.makeText(context, "Autenticación fallida", Toast.LENGTH_SHORT).show()
                                    }
                                })
                            } else {
                                // Mostrar mensaje para configurar huella digital
                                Toast.makeText(context, "No se puede autenticar con huella digital", Toast.LENGTH_SHORT).show()
                            }
                        },
                        modifier = Modifier
                            .padding(10.dp)
                            .background(Color.Transparent)
                            .size(width = 60.dp, height = 60.dp),
                        colors = IconButtonDefaults.iconButtonColors(
                            containerColor = Color.DarkGray,
                        ),
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.huella),
                            contentDescription = null,
                            modifier = Modifier.size(width = 50.dp, height = 50.dp)  // Ajusta el tamaño del ícono
                        )
                    }
                }

                if(LoginVM.showAlert) {
                    Alert(
                        title = "Alerta",
                        message = "Usuario y/o Contraseña incorrecta",
                        confirmText = "Aceptar",
                        onConfirmClick = { LoginVM.closeAlert() }) {}
                    }


            }
        }

    }

}