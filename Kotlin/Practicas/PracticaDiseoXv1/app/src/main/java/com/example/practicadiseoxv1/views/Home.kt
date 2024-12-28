package com.example.practicadiseoxv1.views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults.topAppBarColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.practicadiseoxv1.ui.theme.correcto
import com.example.practicadiseoxv1.ui.theme.incorrecto
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
                        Text(text = "Giovanny Chica", fontWeight = FontWeight.Bold)
                        Text(text = "Bienvenido!", fontSize = 12.sp)
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Icon(
                        imageVector = Icons.Default.AccountCircle, contentDescription = "Perfil",
                        modifier = Modifier.size(50.dp)
                    )
                }
            },
            colors = topAppBarColors(
                containerColor = principal,
                titleContentColor = secundario
            )
        ) }, // Header
//        bottomBar = {  } // Footer
    ) { innerPadding ->
        Column(
            modifier = Modifier.padding(innerPadding),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ){
            // contenido -> Body
            Spacer(modifier = Modifier
                .height(4.dp)
                .fillMaxWidth()
                .background(Color.White))
            CardPrincipal()
            Spacer(modifier = Modifier
                .height(4.dp)
                .fillMaxWidth()
                .background(Color.White))
        }
    }
}

// card de presentación principal
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CardPrincipal(){
    Row(
        horizontalArrangement = Arrangement.SpaceAround,
        modifier = Modifier.fillMaxWidth()
    ){
        ElevatedCard(
            modifier = Modifier
                .width(330.dp)
                .height(160.dp)
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
            Text(
                text = "CARD",
                fontWeight = FontWeight.Bold,
                fontSize = 30.sp,
                color = Color.White
                ,modifier = Modifier.padding(15.dp)
            )
        }
    }
}