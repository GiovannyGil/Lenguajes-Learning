<?php

// require -> require 'archivo.php' 
/**
 * require -> incluye y evalua el archivo especificado
 * --> "lleva" el contenido y lo pega donde se importa
 * --> si no encuentra el archivo, detiene la ejecucion del script
 * --> se utiliza cuando el contenido del archivo se muestra mas de una vez
 * --> se utiliza cuando el archivo es esencial para la ejecución del script
*/



 // require_once -> require_once 'archivo.php'
/**
 *  -> incluye y evalua el archivo especificado, pero solo una vez (si ya se incluyo, no lo vuelve a incluir)+
 *  -> si no encuentra el archivo, detiene la ejecucion del script
 * -> se utiliza cuando el contenido del archivo se muestra mas de una vez
*/

// include -> include 'archivo.php'
/**
 * -> incluye y evalua el archivo especificado
 * -> si no encuentra el archivo, muestra un warning y continua la ejecucion del script
 * -> se usa cuando se quiere incluir un archivo que no es esencial para la ejecución del script
*/


?>