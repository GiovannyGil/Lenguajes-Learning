<?php 

/**
 * IF
 * 
 * -> es una estructura de control de flujo
 * Sintaxis:
 * if (condicion) { contenido a ejecutar}
 */

$age = 25;
if ($age >= 18) {
    echo "Eres mayor de edad";
} else {
    echo "Eres menor de edad";
}


/**
 * ELSE IF
 * 
 * -> es una estructura de control de flujo
 * Sintaxis:
 * if (condicion) { contenido a ejecutar}
 * else if (condicion) { contenido a ejecutar}
 * else { contenido a ejecutar}
 */

if($age >= 18 && $age <= 30) {
    echo "Eres un adulto joven";
} else if ($age > 30 && $age <= 60) {
    echo "Eres un adulto";
} else {
    echo "Eres un adulto mayor";
}


/**
 * sintaxis alternativa
 *  
 * <?php if(condicion): ?>
 *    contenido a ejecutar
 * <?php elseif (condicion): ?>
 *   contenido a ejecutar
 * <?php else: ?>
 *  contenido a ejecutar
 * <?php endif; ?>
 * 
 * -> se recomienda usar la sintaxis alternativa para estructuras de control de flujo o un sistema de plantillas
*/


/**
 * Ternarias
 * 
 * -> es una estructura de control de flujo
 * Sintaxis: condicion ? verdadero : falso
 *  ejemplo:
 * $resultado = $edad >= 18 ? "Eres mayor de edad" : "Eres menor de edad";
 */

 /**
  * SWITCH

    * -> es una estructura de control de flujo
    * Sintaxis:
    * switch (variable) {
    *    case valor1:
    *        contenido a ejecutar
    *        break;
    *    case valor2:
    *        contenido a ejecutar
    *        break;
    *    default:
    *        contenido a ejecutar
    * }
  */



/**
 * MATCH
 * 
 * -> es una estructura de control de flujo
 * Sintaxis:
 * match (variable) {
 *   valor1 => contenido a ejecutar,
 *  valor2 => contenido a ejecutar,
 * default => contenido a ejecutar
 * }
 * 
 * la variable optiene el valor de lo que se esta comparando -> 
 * el valor de la variable que se entrega como parametro se compara con los valores que se encuentran en la estructura, donde encuentre una coincidencia, toma ee valor
 */

$outputAge = match($age) {
    0, 1, 2 => "Eres un bebe",
    3, 4, 5, 6, 7, 8, 9, 10 => "Eres un niño",
    11, 12, 13, 14, 15, 16, 17 => "Eres un adolescente",
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 => "Eres un adulto joven",
    default => "Eres un adulto"
};

// evaluar expreciones con match
$output = match(true) {
    $age < 2 => "Eres un bebe",
    $age < 10 => "Eres un niño",
    $age < 18 => "Eres un adolescente",
    $age <= 30 => "Eres un adulto joven",
    $age <= 55 => "Eres un adulto",
    default => "Eres un adulto mayor"
};
?>