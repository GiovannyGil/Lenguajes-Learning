import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.DarkGray
import androidx.compose.ui.graphics.Color.Companion.Gray
import androidx.compose.ui.graphics.Color.Companion.LightGray
import androidx.compose.ui.graphics.Color.Companion.Red
import androidx.compose.ui.graphics.Color.Companion.Transparent
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.graphics.Color.Companion.Yellow
import androidx.compose.ui.text.TextStyle
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
                .padding(top = 10.dp, bottom = 16.dp, start = 16.dp, end = 16.dp,)
        ) {
            Text(
                text = "Nueva Tarea",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .padding(bottom = 5.dp)
                    .align(alignment = Alignment.CenterHorizontally),
            )
            OutlinedTextField(
                value = "",
                onValueChange = { titleState = it },
                label = {
                    Text("Título", color = DarkGray, modifier = Modifier
                        .background(color = Transparent)
                    )
                        },

                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = Transparent, // Fondo blanco para los campos
                    unfocusedContainerColor = Transparent, // Fondo blanco para los campos
                    focusedBorderColor = Black, // Borde azul transparente al enfocarse
                    unfocusedBorderColor = DarkGray, // Borde azul transparente sin enfoque
                    ),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 5.dp)
            )
            OutlinedTextField(
                value = "",
                onValueChange = { descState = it },
                label = { Text("Descripción", color = DarkGray) },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = Transparent, // Fondo blanco para los campos
                    unfocusedContainerColor = Transparent, // Fondo blanco para los campos
                    focusedBorderColor = Black, // Borde azul transparente al enfocarse
                    unfocusedBorderColor = DarkGray, // Borde azul transparente sin enfoque
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 5.dp)
                    .height(150.dp)
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 5.dp)
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
                        checkedThumbColor = White, // Color del punto cuando está activado
                        checkedTrackColor = lightBlue, // Color de fondo del switch activado

                        uncheckedThumbColor = lightBlue, // Color del punto cuando está desactivado
                        uncheckedTrackColor = Color.DarkGray, // Color de fondo del switch desactivado

                        checkedBorderColor = Transparent,
                        uncheckedBorderColor = Transparent,
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
