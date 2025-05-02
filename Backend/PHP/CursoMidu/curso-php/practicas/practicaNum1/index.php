<?php
// importar las constantes
require_once "consts.php";
// importar las funciones
require_once "functions.php";
require_once 'classes/NextMovie.php';

// obtener los datos de la API
// $data = get_data(API_URL);
// $until_message = get_until_message($data["days_until"]);

$next_movie = NextMovie::fetch_and_create_movie(API_URL); // obtener la instancia de la clase
$next_movie_data = $next_movie->get_data(); // obtener los datos de la clase
?>

<!-- 
    llamar el head con una variable de $data
    tiene acceso a las variables declaradas en el archivo que lo importa
-->
<?php render_template('head', ["title" => $next_movie_data["title"]]); ?>
<!-- importar los estilos -->
<?php require "sections/styles.php"; ?>
<!-- importar el contenido -->
<?php render_template('main', array_merge(
    $next_movie_data, ["until_message" => $next_movie->get_until_message()]
    )
    ); ?>