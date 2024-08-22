import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.animaciones_practica.R
import com.example.animaciones_practica.components.ContentHomeView
import com.example.animaciones_practica.components.MenuLateral
import com.google.accompanist.pager.ExperimentalPagerApi
import com.google.accompanist.pager.HorizontalPager
import com.google.accompanist.pager.rememberPagerState
import kotlinx.coroutines.delay
import kotlinx.coroutines.yield

@Composable
fun SlideView(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    MenuLateral(navController, drawerState) {
        ContentHomeView(drawerState, "SLIDE")

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.SpaceEvenly // Espaciado vertical entre elementos
        ) {
            item {
                ImageCarousel(modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)) // Ajusta la altura del carrusel de imágenes
            }

            item {
                CardsCarousel(modifier = Modifier
                    .fillMaxWidth()) // Ajusta el tamaño del carrusel de tarjetas
            }
        }
    }
}

@OptIn(ExperimentalPagerApi::class)
@Composable
fun ImageCarousel(modifier: Modifier = Modifier) {
    val pagerState = rememberPagerState()

    val images = listOf(
        R.drawable.cs,
        R.drawable.py,
        R.drawable.js,
        R.drawable.ts,
        R.drawable.java,
        R.drawable.kt,
    )

    Box(modifier = modifier, contentAlignment = Alignment.Center) {
        HorizontalPager(
            state = pagerState,
            count = images.size,
            contentPadding = PaddingValues(horizontal = 32.dp)
        ) { page ->
            Image(
                painter = painterResource(id = images[page]),
                contentDescription = "Image $page",
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(1.78f) // 16:9 Aspect ratio
            )
        }
    }

    LaunchedEffect(pagerState) {
        while (true) {
            yield()
            delay(3000) // Tiempo entre imágenes (3 segundos)
            pagerState.animateScrollToPage(
                page = (pagerState.currentPage + 1) % pagerState.pageCount
            )
        }
    }
}

data class CardData(
    val titulo: String,
    val descripcion: String,
    val cantidad: Int,
    val icono: Int
)

@Composable
fun CardsCarousel(modifier: Modifier = Modifier) {
    val cards = listOf(
        CardData("Card 1", "Descripción de la tarjeta 1", 10, R.drawable.ic_image),
        CardData("Card 2", "Descripción de la tarjeta 2", 20, R.drawable.ic_image),
        CardData("Card 3", "Descripción de la tarjeta 3", 30, R.drawable.ic_image),
    )

    LazyRow(
        modifier = modifier,
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp) // Espaciado horizontal entre tarjetas
    ) {
        items(cards) { card ->
            CardContent(
                titulo = card.titulo,
                descripcion = card.descripcion,
                cantidad = card.cantidad,
                icono = card.icono
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CardContent(titulo: String, descripcion: String, cantidad: Int, icono: Int) {
    ElevatedCard(
        modifier = Modifier
            .width(200.dp)
            .padding(8.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Image(
                    painter = painterResource(id = icono),
                    contentDescription = "Icono",
                    modifier = Modifier.size(40.dp)
                )
                Text(text = titulo)
            }
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(text = descripcion)
                Text(text = cantidad.toString())
            }
        }
    }
}
