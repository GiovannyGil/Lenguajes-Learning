package com.example.onboardingapp.OnBoardingView

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.example.onboardingapp.R
import com.example.onboardingapp.data.PageData
import com.google.accompanist.pager.ExperimentalPagerApi
import com.google.accompanist.pager.rememberPagerState

@OptIn(ExperimentalPagerApi::class)
@Composable
fun MainOnBoarding() {
    val items = ArrayList<PageData>()

    items.add(PageData(
        R.raw.page1,
        "Titulo 1",
        "lorem ipsut not file nest ui desprecible complement induals"
        )
    )

    items.add(PageData(
        R.raw.page2,
        "Titulo 1",
        "lorem ipsut not file nest ui desprecible complement induals"
        )
    )

    items.add(PageData(
        R.raw.page3,
        "Titulo 1",
        "lorem ipsut not file nest ui desprecible complement induals"
        )
    )

    val pagerState = rememberPagerState(
        pageCount = items.size,
        initialOffscreenLimit = 2, // temrina en el index 2
        infiniteLoop = false,
        initialPage = 0 // inicia en el indix 0
    )

    OnBoardingPager(item = items, pagerState = pagerState, modifier = Modifier
        .fillMaxWidth()
        .background(Color.White)
    )
}