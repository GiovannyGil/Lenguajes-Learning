package com.example.notificacioneslocalesmenulateralyworkmanager

import android.app.NotificationManager
import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.work.Constraints
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import java.util.concurrent.TimeUnit
import kotlin.random.Random

class NotificationWorker(context: Context, params: WorkerParameters): Worker(context, params) {

    override fun doWork(): Result {
        showBasicNotification()
        return  Result.success()
    }

    private fun showBasicNotification(){
        val notification = NotificationCompat.Builder(applicationContext, "123")

            // cuerpo de la notificacion
            .setContentTitle("Titulo")
            .setContentText("Lorem two dual cup nest float")
            .setSmallIcon(R.drawable.not)
            .setPriority(NotificationManager.IMPORTANCE_HIGH)
            .setAutoCancel(true)
            .build()
        val notificationManager = applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        notificationManager.notify(
            Random.nextInt(),
            notification
        )
    }

// NOTIFICACION que funciona sin internet, recargar o estar en la app
    companion object{
        fun releaseNotification(context: Context){
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.NOT_REQUIRED)
                .setRequiresCharging(false)
                .setRequiresBatteryNotLow(false)
                .build()

            val notificationWork = OneTimeWorkRequestBuilder<NotificationWorker>()
                .setConstraints(constraints)
                .setInitialDelay(7, TimeUnit.SECONDS)
                .build()
            WorkManager.getInstance(context).enqueue(notificationWork)
        }
    }
}