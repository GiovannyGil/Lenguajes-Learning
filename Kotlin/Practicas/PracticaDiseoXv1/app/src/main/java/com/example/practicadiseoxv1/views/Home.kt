package com.example.practicadiseoxv1.views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@OptIn(ExperimentalMaterial3Api::class)
@Preview(showBackground = true)
@Composable
fun home() {
    Scaffold(
//        topBar = { TopBar() }, // Header
//        bottomBar = { BottomBar() } // Footer
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .background(color = Color.Black),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ){
            // contenido -> Body
            Row(
                horizontalArrangement = Arrangement.SpaceAround,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = "NOMBRE PRINCIPAL", fontSize = 24.sp, color = Color.White, modifier = Modifier.padding(18.dp))
            }
            Spacer(modifier = Modifier.height(4.dp).fillMaxWidth().background(Color.White))
            Row(
                horizontalArrangement = Arrangement.SpaceAround,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = "NOMBRE SECUNDARIO", fontSize = 24.sp, color = Color.White, modifier = Modifier.padding(18.dp))
            }

        }
    }
}