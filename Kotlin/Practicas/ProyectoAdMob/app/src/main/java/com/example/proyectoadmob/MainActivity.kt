package com.example.proyectoadmob

import android.app.Activity
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.proyectoadmob.ui.theme.ProyectoAdMobTheme
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ProyectoAdMobTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
//                    BannerView(
//                        modifier = Modifier.fillMaxSize(),
//                        adId = "ca-app-pub-3940256099942544/6300978111"
//                    )
                    InterstitialBanner()
                }
            }
        }
    }
}

@Composable
fun BannerView(modifier: Modifier, adId: String) {
    Column(modifier = Modifier) {
        Spacer(modifier = Modifier.size(24.dp))
        AndroidView(
            modifier = Modifier.fillMaxWidth(),
            factory = { context ->
                AdView(context).apply {
                    setAdSize(AdSize.BANNER)
                    adUnitId = adId
                    loadAd(AdRequest.Builder().build())
                }
            }
        )
    }
}

@Composable
fun InterstitialBanner() {
    val activity = LocalContext.current as Activity
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Button(onClick = { showInterstitial(activity) }) {
            Text(text = "Mostrar Anuncio")
        }
    }
}

fun showInterstitial(activity: Activity) {
    loadInterstitialAd(activity) { interstitialAd ->
        if (interstitialAd != null){
            interstitialAd.show(activity)
        }else{
            Log.d("Error", "Fallo el anuncio")
        }
    }
}

fun loadInterstitialAd(activity: Activity, callback: (InterstitialAd?) -> Unit) {
    val adRequest = AdRequest.Builder().build()

    InterstitialAd.load(
        activity,
        "ca-app-pub-3940256099942544/1033173712",
        adRequest,
        object : InterstitialAdLoadCallback() {
            override fun onAdFailedToLoad(error: LoadAdError) {
                super.onAdFailedToLoad(error)
                Log.d("Error", error.message)
                callback(null)
            }

            override fun onAdLoaded(interstitialAd: InterstitialAd) {
                super.onAdLoaded(interstitialAd)
                callback(interstitialAd)
            }
        }
    )

}

















