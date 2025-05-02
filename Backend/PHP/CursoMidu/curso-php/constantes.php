<?php

/**
 * RECOMENDACION
 * -> las constantes se deben definir en mayusculas
 * -> las constantes no se pueden cambiar
 * -> las constantes no se pueden redefinir
 * -> las constantes no se pueden eliminar
 * -> las constantes no se pueden definir dentro de una funcion
 * -> las constantes no se pueden definir con el simbolo "$"
 * -> las constantes no se pueden definir con palabras reservadas
 * -> las constantes no se pueden definir con espacios
 * 
 * --> es recomendable definir las constantes en un archivo separado -> "constantes.php"
 *  y luego incluirlo en el archivo principal -> "index.php"
 *  esto con el fin de tener un mejor orden y estructura en el codigo
 */

// constantes globales -> se pueden acceder desde cualquier parte del codigo
// son a nivel proyecto
define('NAME', 'Giovanny');
define('AGE', 24);



// constantes locales -> solo se pueden acceder desde el archivo donde se definieron
const NOMBRE = "Giovanny";
const EDAD = 24;



?>