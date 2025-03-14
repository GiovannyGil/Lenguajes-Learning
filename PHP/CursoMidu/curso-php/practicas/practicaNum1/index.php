<?php
const API_URL = "https://whenisthenextmcufilm.com/api";
// inicializar cUrl
$ch = curl_init(API_URL);
// Indicar, resivir la respuesta del servidor/peticion http, no mostrar en pantalla
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// ejecutar la peticion y guardar la respuesta en una variable
$result = curl_exec($ch);

// datos
// convertir la respuesta en un array (varaible, asociativa)
$data = json_decode($result, true);

// cerrar la peticion
curl_close($ch);

//ver el contenido de la respuesta
// var_dump($data);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Centered viewport -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css">
    <title>API -> Practica php</title>
</head>

<body>
    <main>
        <!-- <pre style="font-size: 8px; overflow: scroll; height: 250px">
            <?php // var_dump($data);  
            ?>
        </pre> -->
        <section>
            <img src="<?= $data["poster_url"] ?>" width="400" alt="Poster de <?= $data["title"] ?>" style="border-radius: 16px;">
        </section>
        <hgroup>
            <h3><?= $data["title"] ?> se extrena en <?= $data["days_until"]; ?> días</h3>
            <p>Fecha de extreno: <?= $data["release_date"]; ?> </p>
            <p>La siguiente es: <?= $data["following_production"]["title"]; ?></p>
        </hgroup>
    </main>
</body>


<style>
    :root {
        color-scheme: light dark;
    }

    body {
        display: grid;
        place-content: center;
        font-size: 25px;
        font-family: Arial, sans-serif;
        color: #f1f1f1;
    }

    section {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    hgroup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    img {
        margin: 0 auto;
    }
</style>

</html>