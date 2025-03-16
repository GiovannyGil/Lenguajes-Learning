<?php

declare(strict_types=1); // para que php sea estricto con los tipos de datos


/**
 * Funcion para obtener los datos de una API
 * 
 * @param string $url -> parametro que recibe la url de la API
 * @return array -> retorna un array asociativo con los datos de la API
 */
function get_data(string $url): array
{
    $result = file_get_contents($url);
    // convertir el json en un array asociativo
    $data = json_decode($result, true); // true para que lo convierta en un array asociativo
    return $data;
}

function get_until_message(int $days): string
{
    return match (true) {
        $days === 0 => "Hoy se extrena! 🎉",
        $days === 1 => "Mañana se estrena 🎬",
        $days < 7 => "esta semana se estrena 🍿",
        $days < 30 => "este mes se estrena 🎥",
        default => "En $days días se estrena 📅",
    };
}

function render_template(string $template, $data = [])
{
    extract($data); // extraer los datos para que esten disponibles en el archivo que se importa

    // extraer los datos para que esten disponibles en el archivo que se importa
    require "templates/$template.php";
}
