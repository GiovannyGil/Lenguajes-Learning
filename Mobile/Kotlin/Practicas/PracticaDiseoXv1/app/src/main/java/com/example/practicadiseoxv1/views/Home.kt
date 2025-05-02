package com.example.practicadiseoxv1.views

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.sharp.Face
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults.topAppBarColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.practicadiseoxv1.R
import com.example.practicadiseoxv1.ui.theme.correcto
import com.example.practicadiseoxv1.ui.theme.incorrecto
import com.example.practicadiseoxv1.ui.theme.neutros
import com.example.practicadiseoxv1.ui.theme.principal
import com.example.practicadiseoxv1.ui.theme.secundario

@OptIn(ExperimentalMaterial3Api::class)
@Preview(showBackground = true)
@Composable
fun home() {
    Scaffold(
        topBar = { TopAppBar(
            title = {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text(text = "Giovanny Chica", fontWeight = FontWeight.Bold, color = Color.White)
                        Text(text = "Bienvenido!", fontSize = 12.sp, color = Color.White)
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Icon(
                        imageVector = Icons.Default.AccountCircle, contentDescription = "Perfil", tint = Color.White,
                        modifier = Modifier.size(50.dp),
                    )
                }
            },
            colors = topAppBarColors(
                containerColor = principal,
                titleContentColor = secundario
            )
        ) }, // Header
        bottomBar = {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceAround,
                modifier = Modifier
                    .fillMaxWidth()
                    .background(principal)
                    .padding(bottom = 10.dp)
            ) {
                Footer(Nombre = "Home", Icono = R.drawable.home)
            }
        } // Footer
    ) { innerPadding ->
        Column(
            modifier = Modifier.padding(innerPadding),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ){
            // contenido -> Body
            CardsSlide()
            // campo para caja de iconos
            CajaIconos()
        }
    }
}

@Composable
fun CardsSlide(){
    LazyRow(
        modifier = Modifier
            .fillMaxWidth()
            .padding(10.dp),
        horizontalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item(
        ) {
            CardPrincipal(titulo = "Titulo 1", descripcion = "Descripcion", Icono = R.drawable.flutter_dash)
            CardPrincipal(titulo = "Titulo 2", descripcion = "Descripcion", Icono = R.drawable.spa)
            CardPrincipal(titulo = "Titulo 3", descripcion = "Descripcion", Icono = R.drawable.mode_night)
        }
    }
}

// card de presentación principal
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CardPrincipal(titulo: String, descripcion: String, Icono: Int) {
    Row(
        horizontalArrangement = Arrangement.SpaceAround,
        modifier = Modifier.fillMaxWidth()
    ) {
        ElevatedCard(
            modifier = Modifier
                .width(330.dp)
                .height(170.dp)
                .padding(10.dp)
                .shadow(
                    elevation = 8.dp,
                    spotColor = Color.Black,
                    ambientColor = Color.Black,
                    shape = RoundedCornerShape(16.dp),
                    clip = true,
                ),
            colors = CardDefaults.elevatedCardColors(containerColor = principal),
            onClick = { /*TODO*/ }
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(6.dp) // Para evitar que los elementos queden pegados al borde
            ) {
                // Título de la Card
                Text(
                    text = titulo,
                    fontWeight = FontWeight.Bold,
                    fontSize = 30.sp,
                    color = Color.White,
                    modifier = Modifier
                        .align(Alignment.TopStart)
                        .padding(start = 10.dp, top = 20.dp)
                )
                Text(
                    text = descripcion,
                    color = Color.White,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier
                        .align(Alignment.CenterStart)
                        .padding(start = 10.dp)
                )

                // Icono en la esquina inferior izquierda
                Box(
                    modifier = Modifier
                        .size(140.dp) // Tamaño del fondo circular
                        .align(Alignment.BottomEnd) // Alineado abajo a la izquierda
                        .background(Color.White, shape = CircleShape) // Fondo circular blanco
                        .padding(2.dp) // Espaciado interno para el ícono
                ) {
                    Icon(
                        painter = painterResource(id = Icono),
                        contentDescription = "Principal",
                        tint = principal, // Ícono del color principal
                        modifier = Modifier.fillMaxSize()
                    )
                }
            }
        }
    }
}

@Composable
fun CajaIconos() {
    // crear una lista de iconos que se van a mostrar
    val iconos = listOf(
        Pair(R.drawable.flutter_dash, "Flutter"),
        Pair(R.drawable.spa, "Spa"),
        Pair(R.drawable.mode_night, "Modo Noche"),
        Pair(R.drawable.llama, "Llama"),
        Pair(R.drawable.security, "Security"),
        Pair(R.drawable.motorsports, "MotoSport"),
        Pair(R.drawable.verified, "Verified"),
        Pair(R.drawable.visibility, "Visibility"),
        Pair(R.drawable.fingerprint, "FingerPrint"),
    )

    Row(
        horizontalArrangement = Arrangement.SpaceAround,
        modifier = Modifier.fillMaxWidth()
    ) {
        OutlinedCard(
            modifier = Modifier
                .width(350.dp)
                .height(190.dp),
            colors = CardDefaults.outlinedCardColors(containerColor = secundario),
            shape = RoundedCornerShape(16.dp),
            border = BorderStroke(1.5.dp, neutros)
        ) {
            LazyVerticalGrid(
                columns = GridCells.Adaptive(95.dp), // Tamaño adaptativo para las celdas
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
                modifier = Modifier.padding(10.dp)
            ) {
                // recorrer los iconos y mostrarlos en una grilla
                items(iconos) { icono ->
                    Icono(icono.first, icono.second)
                }
            }
        }
    }
}

@Composable
fun Icono(Icono: Int, descripcion: String){
    Icon(painter = painterResource(id = Icono), contentDescription = descripcion, modifier = Modifier.size(50.dp), tint = Color.Black)
}

@Composable
fun Footer(Nombre: String, Icono: Int){
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.padding(bottom = 10.dp)
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.size(55.dp)
        ){
            Icon(painter = painterResource(id = Icono), contentDescription = Nombre, tint = Color.Black, modifier = Modifier.size(50.dp))
        }
        Text(text = Nombre, color = Color.Black, fontWeight = FontWeight.SemiBold)
    }
}