package com.example.practicadiseo.views

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults.topAppBarColors
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.Icon
import androidx.compose.ui.Alignment
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.example.desingbank.R
import com.example.practicadiseo.ui.theme.*
import java.util.Vector

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HeaderHome() {
    var presses by remember { mutableIntStateOf(0) }
    Scaffold(
        topBar = {
            TopAppBar(title = {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.AccountCircle,
                        contentDescription = "Perfil",
                        modifier = Modifier
                            .size(50.dp)
                            .clip(CircleShape)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text(text = "Giovanny Chica", fontWeight = FontWeight.Bold)
                        Text(text = "Bienvenido!", fontSize = 12.sp)
                    }
                }
            },
                colors = topAppBarColors(
                    containerColor = CustomPrimary,
                    titleContentColor = TitleHeader,
                )
            )
        },
        bottomBar = {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceAround,
                modifier = Modifier.fillMaxWidth().padding(bottom = 10.dp)

            ) {
                Footer(Nombre = "Home", Icono = R.drawable.home)
                Footer(Nombre = "Transferencias", Icono = R.drawable.transefer)
                Footer(Nombre = "Pagos", Icono = R.drawable.pagos)
                Footer(Nombre = "Ajustes", Icono = R.drawable.settings)
            }
        }

    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .padding(10.dp),

            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Cuenta", style = MaterialTheme.typography.titleLarge, color = TitleSecondary)
                Text("Ver Todo", style = MaterialTheme.typography.bodySmall, color = TitleTerceary)

            }
            Spacer(modifier = Modifier.height(4.dp))
            Row(
                horizontalArrangement = Arrangement.SpaceAround,
                modifier = Modifier.fillMaxWidth()
            ) {
                Cards("Inversión", "$5,234.56")
                Cards("Ahorro", "$12,345.67")
            }
            Text("Más Acciones", style = MaterialTheme.typography.titleLarge, color = TitleSecondary,
                modifier = Modifier
                    .padding(top = 25.dp))
            Row(
                horizontalArrangement = Arrangement.SpaceAround,
                modifier = Modifier.fillMaxWidth()
            ) {
                MaxActions(Nombre = "Tranferencia", Icono = R.drawable.transefer)
                MaxActions(Nombre = "Pagos", Icono = R.drawable.pagos)
                MaxActions(Nombre = "Rentabilidad", Icono = R.drawable.rendimiento_24)
            }


            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Movientos Recientes", style = MaterialTheme.typography.titleLarge, color = TitleSecondary)
                Text("Ver Todo", style = MaterialTheme.typography.bodySmall, color = TitleTerceary)

            }

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth()
            ) {
                MovimientosRecientes(NombreEntidad ="Amazon", Titulo = "Compra Online", Precio = "-$124.99", Fecha = "Aug 15")
                MovimientosRecientes(NombreEntidad ="PayPal", Titulo = "Transferencia", Precio = "-$500", Fecha = "Aug 14")
                MovimientosRecientes(NombreEntidad ="Banco", Titulo = "Descuento Mensual", Precio = "-$999", Fecha = "Aug 13")
            }
        }
    }
}

@Composable
fun Cards(Nombre: String, Valor: String) {
    ElevatedCard(
        modifier = Modifier
            .width(170.dp)
            .height(110.dp)
            .shadow(
                elevation = 6.dp,
                shape = RoundedCornerShape(12.dp),
                clip = true
            )
        ,
        shape = RoundedCornerShape(8.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color.White,
            contentColor = Color.Black
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(Nombre, fontWeight = FontWeight.Bold, color = TitleTerceary)
            Spacer(modifier = Modifier.height(8.dp))
            Text(Valor, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TitleSecondary)
        }
    }
}

@Composable
fun MaxActions(Nombre: String, Icono: Int ){
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.padding(8.dp)
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .size(64.dp)
                .background(Color.Cyan, CircleShape)
        ) {
            Icon(
                painter = painterResource(id = Icono),
                contentDescription = Nombre,
                tint = Color.White,
                modifier = Modifier.size(32.dp)
            )
        }
        Spacer(modifier = Modifier.height(3.dp))
        Text(Nombre, fontWeight = FontWeight.SemiBold, color = TitleTerceary)
    }
}

@Composable
fun MovimientosRecientes(NombreEntidad: String, Titulo: String, Precio: String, Fecha: String) {
    Row(
        horizontalArrangement = Arrangement.SpaceAround,
        modifier = Modifier.fillMaxWidth()
    ) {
        Icon(
            imageVector = Icons.Default.AccountCircle,
            contentDescription = "Perfil",
            modifier = Modifier
                .size(50.dp)
                .clip(CircleShape)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column {
                Text(text = NombreEntidad, fontWeight = FontWeight.Bold)
                Text(text = Titulo, fontSize = 18.sp)
            }
            Column {
                Text(text = Precio, fontWeight = FontWeight.Bold, color = DiscountPrice)
                Text(text = Fecha, fontSize = 15.sp)
            }
        }
    }
}



@Composable
fun Footer(Nombre: String, Icono: Int ) {

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.padding(bottom = 40.dp)
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .size(38.dp)
                .background(Color.White)
        ) {
            Icon(
                painter = painterResource(id = Icono),
                contentDescription = Nombre,
                tint = Color.Black,
                modifier = Modifier.size(32.dp)
            )
        }
        Text(Nombre, fontWeight = FontWeight.SemiBold, color = TitleTerceary)
    }

}