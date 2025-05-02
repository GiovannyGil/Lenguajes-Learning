package com.example.notificacioneslocalesmenulateralyworkmanager.views

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.DrawerState
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavController
import com.example.notificacioneslocalesmenulateralyworkmanager.NotificationService
import com.example.notificacioneslocalesmenulateralyworkmanager.NotificationWorker
import com.example.notificacioneslocalesmenulateralyworkmanager.components.MenuLateral
import com.example.notificacioneslocalesmenulateralyworkmanager.components.TopBar

@Composable
fun HomeView(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    MenuLateral(navController, drawerState) {
        ContentHomeView(drawerState)
    }
}

@Composable
fun ContentHomeView(drawerState: DrawerState) {
    Scaffold(
        topBar = {
            TopBar(drawerState = drawerState, title = "Principal")
        }
    ) {
        pad ->
        NotificationView(pad)
    }
}

@Composable
fun NotificationView(paddingValues: PaddingValues) {
    val context = LocalContext.current
    val notificationService = NotificationService(context)
    Column(modifier = Modifier
        .padding(paddingValues)
        .fillMaxWidth(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Notifications")
        
        Button(onClick = { notificationService.showBasicNotification() }) {
            Text(text = "Basic Notification")
        }

        Button(onClick = { notificationService.showLargeNotification() }) {
            Text(text = "Large Notification")
        }

        Button(onClick = { notificationService.showInboxNotification() }) {
            Text(text = "Inbox Notification")
        }

        Button(onClick = { notificationService.showImageNotification() }) {
            Text(text = "Image Notification")
        }

        Button(onClick = { NotificationWorker.releaseNotification(context) }) {
            Text(text = "BackGround Notification")
        }
    }
}