package com.example.notificacioneslocalesmenulateralyworkmanager

import android.app.Notification
import android.app.NotificationManager
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import androidx.annotation.DrawableRes
import androidx.core.app.NotificationCompat
import kotlin.random.Random

class NotificationService(private val context: Context) {
    private val notificationManager = context.getSystemService(NotificationManager::class.java)



    // notificacion simple
    fun showBasicNotification(){
        val notification = NotificationCompat.Builder(context, "123")

        // cuerpo de la notificacion
            .setContentTitle("Titulo")
            .setContentText("Lorem two dual cup nest float")
            .setSmallIcon(R.drawable.not)
            .setPriority(NotificationManager.IMPORTANCE_HIGH)
            .setAutoCancel(true)
            .build()
        notificationManager.notify(
            Random.nextInt(),
            notification
        )
    }

    // notificacion de texto largo
    fun showLargeNotification(){
        val notification = NotificationCompat.Builder(context, "123")

            // cuerpo de la notificacion
            .setContentTitle("Titulo")
            .setContentText("Lorem two dual cup nest float")
            .setSmallIcon(R.drawable.not)
            .setPriority(NotificationManager.IMPORTANCE_HIGH)
            .setStyle(NotificationCompat
                .BigTextStyle()
                .bigText("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
            .setAutoCancel(true)
            .build()
        notificationManager.notify(
            Random.nextInt(),
            notification
        )
    }


    // notificacion de inbox
    fun showInboxNotification(){
        val notification = NotificationCompat.Builder(context, "123")

            // cuerpo de la notificacion
            .setContentTitle("Titulo")
            .setContentText("Lorem two dual cup nest float")
            .setSmallIcon(R.drawable.not)
            .setPriority(NotificationManager.IMPORTANCE_HIGH)
            .setStyle(
                NotificationCompat
                    .InboxStyle()
                    .addLine("LINEA 1")
                    .addLine("LINEA 2")
                    .addLine("LINEA 3")
                    .addLine("LINEA 4")
                    .addLine("LINEA 5")
            )
            .setAutoCancel(true)
            .build()
        notificationManager.notify(
            Random.nextInt(),
            notification
        )
    }



    // convertir img en icon
    private fun Context.bitmapFromResource(
        @DrawableRes resId: Int
    ) = BitmapFactory.decodeResource(
        resources,
        resId
    )



    //🔔 -> notificacion con imagen
    fun showImageNotification(){
        val image = context.bitmapFromResource(R.drawable.notificacion)
        val notification = NotificationCompat.Builder(context, "123")

            // cuerpo de la notificacion
            .setContentTitle("Titulo")
            .setContentText("Lorem two dual cup nest float")
            .setSmallIcon(R.drawable.not)
            .setPriority(NotificationManager.IMPORTANCE_HIGH)
            .setLargeIcon(image)
            .setStyle(
                NotificationCompat
                .BigPictureStyle()
                .bigPicture(image)
                .bigLargeIcon(null as Bitmap?)
            )
            .setAutoCancel(true)
            .build()
        notificationManager.notify(
            Random.nextInt(),
            notification
        )
    }

}