<?php

/**
* como llamar una API en php
*

* -> cUrl -> es una libreria que permite hacer peticiones http
*/

const API_URL = "https://jsonplaceholder.typicode.com/posts";
// inicializar cUrl
$ch = curl_init(API_URL);

// Indicar, resivir la respuesta del servidor/peticion http, no mostrar en pantalla

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// ejecutar la peticion y guardar la respuesta en una variable
$result = curl_exec($ch);
// cerrar la peticion
curl_close($ch);
?>


<?php

/**
* como llamar una API en php segunda forma
*
* -> file_get_contents -> es una funcion que permite hacer peticiones http
* -> es mas facil de usar que cUrl
* -> no es necesario inicializar la peticion
* -> no es necesario cerrar la peticion
* -> no es necesario indicar que se va a recibir la respuesta del servidor
* ----> IMPORTANTE, SOLO SE PUEDE USAR PARA PETICIONES GET
*/

$result = file_get_contents("https://jsonplaceholder.typicode.com/posts");

?>