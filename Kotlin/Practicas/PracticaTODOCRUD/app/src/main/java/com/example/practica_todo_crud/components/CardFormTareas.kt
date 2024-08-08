import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Transparent
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.practica_todo_crud.ui.theme.lightBlue

@Composable
fun ElegantFormCard(
    title: String,
    desc: String,
    estado: Boolean,
    onClick: () -> Unit
) {
    var titleState by remember { mutableStateOf(title) }
    var descState by remember { mutableStateOf(desc) }
    var estadoState by remember { mutableStateOf(estado) }


    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(8.dp)
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
        ) {
            Text(
                text = "Formulario",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .padding(bottom = 8.dp),
            )
            OutlinedTextField(
                value = "",
                onValueChange = { titleState = it },
                label = {
                    Text("Título", color = Color.DarkGray)
                        },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = Color.LightGray, // Fondo blanco para los campos
                    unfocusedContainerColor = Color.LightGray, // Fondo blanco para los campos

                    disabledContainerColor = Color.White,
                    focusedBorderColor = Transparent, // Borde azul transparente al enfocarse
                    unfocusedBorderColor = Transparent, // Borde azul transparente sin enfoque

                    unfocusedLabelColor = Transparent,
                    focusedLabelColor = Transparent,

                    unfocusedPlaceholderColor = Transparent,
                    focusedTextColor = Color.White
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            )
            OutlinedTextField(
                value = "",
                onValueChange = { descState = it },
                label = { Text("Descripción", color = Color.DarkGray) },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = Color.White, // Fondo blanco para los campos
                    unfocusedContainerColor = Color.White,
                    disabledContainerColor = Color.White,
                    focusedBorderColor = Color.LightGray, // Borde azul celeste al enfocarse
                    unfocusedBorderColor = Color.LightGray, // Borde azul celeste sin enfoque
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            ) {
                Text(
                    text = "Estado",
                    fontSize = 16.sp,
                    modifier = Modifier.weight(1f)
                )
                Switch(
                    checked = estadoState,
                    onCheckedChange = { estadoState = it },
                    colors = SwitchDefaults.colors(
                        checkedThumbColor = Color.White, // Color del punto cuando está activado
                        uncheckedThumbColor = Color.DarkGray, // Color del punto cuando está desactivado
                        checkedTrackColor = lightBlue, // Color de fondo del switch activado
                        uncheckedTrackColor = lightBlue // Color de fondo del switch desactivado
                    )
                )
            }
            Button(
                onClick = onClick,
                colors = ButtonDefaults.buttonColors(
                    containerColor = lightBlue // Color azul celeste para el botón
                ),

                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 16.dp)
            ) {
            Text(text = "Enviar", color = Color.DarkGray,)
        }
        }
    }
}
