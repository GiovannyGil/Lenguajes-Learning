package com.example.animaciones_practica.views

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.CornerBasedShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.datasource.LoremIpsum
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.wear.compose.material.ContentAlpha
import androidx.wear.compose.material.LocalContentAlpha
import com.example.animaciones_practica.R
import com.example.animaciones_practica.components.ContentHomeView
import com.example.animaciones_practica.components.MenuLateral

@Composable
fun CardsView(navController: NavController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    MenuLateral(navController, drawerState) {
        ContentHomeView(drawerState, "CARDS")
        cards()
    }

}


@Composable
fun cards() {
    Box(
        modifier = Modifier
            .fillMaxSize()
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceAround,
            modifier = Modifier
                .fillMaxSize()
                .padding(5.dp)
        ) {
            CardFilled()
            CardOutline()
            StandardCard()
        }
    }
}

@Composable
fun CardFilled() {
    var expanded by remember { mutableStateOf(false) }

    val width by animateDpAsState(
        targetValue = if (expanded) 340.dp else 320.dp,
        animationSpec = tween(durationMillis = 500), label = ""
    )
    val height by animateDpAsState(
        targetValue = if (expanded) 160.dp else 140.dp,
        animationSpec = tween(durationMillis = 500), label = ""
    )

    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.tertiaryContainer
        ),
        modifier = Modifier
            .size(width = width, height = height)
            .clickable { expanded = !expanded },
    ) {
        Text(
            text = "Filled Card",
            modifier = Modifier.padding(12.dp),
            textAlign = TextAlign.Center, fontSize = 16.sp
        )

        Text(
            text = "Esta es la descripción detallada que se muestra al expandir la tarjeta.",
            modifier = Modifier.padding(16.dp)
        )
    }
}


@Composable
fun CardOutline() {
    var isExpanded by remember { mutableStateOf(false) }

    // Altura animada usando una animación de resorte
    val heightAnimation by animateDpAsState(
        targetValue = if (isExpanded) 200.dp else 70.dp, // Altura expandida o colapsada
        animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy)
    )

    OutlinedCard(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer
        ),
        border = BorderStroke(1.dp, Color.Black),
        modifier = Modifier
            .size(width = 320.dp, height = heightAnimation) // Tamaño animado
            .clickable { isExpanded = !isExpanded } // Toggle de expansión
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Text(
                    text = "Outline Card",
                    textAlign = TextAlign.Start,
                    fontSize = 24.sp,
                    modifier = Modifier.weight(1f)
                )
                Icon(
                    imageVector = if (isExpanded) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore,
                    contentDescription = "Expand Icon",
                    tint = MaterialTheme.colorScheme.secondary
                )
            }
            if (isExpanded) {
                Text(
                    text = "Esta es la descripción detallada que se muestra al expandir la tarjeta.",
                    modifier = Modifier.padding(16.dp)
                )
            }
        }
    }
}


@Composable
fun StandardCard(
    modifier: Modifier = Modifier,
    elevation: Dp = 1.dp,
    border: BorderStroke? = null,
    //background: Color? = MaterialTheme.colors.surface,
    //contentColor: Color? = contentColorFor(background),
    shape: Shape = MaterialTheme.shapes.medium
) {
    Card(
        //backgroundColor = background,
        //contentColor = contentColor,
        //shape = shape,
        //elevation = elevation,
        border = border,
        modifier = modifier
    ) {
        // Contenedor
        Column {
            Row(
                Modifier
                    .fillMaxWidth()
                    .height(72.dp)
                    .padding(start = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Miniatura
                Box(
                    modifier = Modifier
                        .background(color = Color.LightGray, shape = CircleShape)
                        .size(35.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Image(
                        painter = painterResource(R.drawable.ic_image),
                        contentDescription = null
                    )
                }

                Spacer(modifier = Modifier.width(25.dp))

                Column(Modifier.fillMaxWidth()) {
                    // Encabezado
                    Text(text = "Título", style = MaterialTheme.typography.titleLarge)

                    // Subtítulo
                    CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.medium) {
                        Text(text = "Texto secundario", style = MaterialTheme.typography.titleSmall)
                    }
                }
            }

            // Multimedia
            Image(
                painterResource(id = R.drawable.ic_image),
                contentDescription = "Multimedia de tarjeta",
                Modifier
                    .background(color = Color.LightGray)
                    .fillMaxWidth()
                    .height(194.dp)
            )

            Row(Modifier.padding(start = 12.dp, end = 24.dp, top = 16.dp)) {

                // Texto de ayuda
                CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.medium) {
                    Text(
                        text = LoremIpsum(50).values.take(10).joinToString(separator = " "),
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis,
                        style = MaterialTheme.typography.bodyMedium,
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.medium) {

                Box(
                    Modifier
                        .padding(horizontal = 8.dp)
                        .fillMaxWidth()
                ) {

                    // Botones
                    Row(modifier = Modifier.align(Alignment.CenterStart)) {

                        TextButton(onClick = { /*TODO*/ }) {
                            Text(text = "ACCIÓN 1")
                        }

                        Spacer(modifier = Modifier.width(8.dp))

                        TextButton(onClick = { /*TODO*/ }) {
                            Text(text = "ACCIÓN 2")
                        }
                    }

                    // Iconos
                    Row(modifier = Modifier.align(Alignment.CenterEnd)) {
                        IconButton(onClick = { /*TODO*/ }) {
                            Icon(Icons.Default.Favorite, contentDescription = null)
                        }

                        IconButton(onClick = { /*TODO*/ }) {
                            Icon(Icons.Default.Share, contentDescription = null)
                        }
                    }
                }
            }
        }
    }
}