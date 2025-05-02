<?php

$mejorlenguaje = [ "PHP", "JavaScript", "Python", "Java", "C#" ];

// agregar un elemento al final del array
$mejorlenguaje[] = "Ruby";

// agregar un elemento al inicio del array
array_unshift($mejorlenguaje, "C++");

// eliminar el ultimo elemento del array
array_pop($mejorlenguaje);

// eliminar el primer elemento del array
array_shift($mejorlenguaje);

// eliminar un elemento en una posicion especifica
unset($mejorlenguaje[1]);

// agregar un elemento en una posicion especifica
array_splice($mejorlenguaje, 1, 0, "JavaScript");

// reemplazar un elemento en una posicion especifica
$mejorlenguaje[1] = "JavaScript";


// recorrer un array
/**
 * Sintaxis:
 * foreach (array as $key => $value) {
 *   echo $key . " -> " . $value . "<br>";
 * }
 */
foreach ($mejorlenguaje as $lenguaje) {
    echo $lenguaje . "<br>";
}


// Diccioanrios
/**
 * -> es un array asociativo
 * -> es un array que tiene un indice asociado a un valor
 * -> se puede acceder a los valores por medio de la clave
 * -> se puede acceder a los valores por medio del indice
 * 
 * (indice, clave) => valor
 * sintaxis:
 * $diccionario = [
 *    "clave" => "valor",
 *   "clave" => "valor",
 * ];
 */
$persona = [
    "nombre" => "Giovanny",
    "edad" => 24,
    "pais" => "Colombia",
    "ciudad" => "Medellín",
    "profesion" => "Software Developer"
];

?>