<?php

declare(strict_types=1); // para que php sea estricto con los tipos de datos

class NextMovie
{
    public function __construct(
        private string $title,
        private int $days_until,
        private string $following_production,
        private string $release_date,
        private string $poster_url,
        private string $overview
    ) {}

    public function get_until_message(): string
    {
        $days = $this->days_until;
        return match (true) {
            $days === 0 => "Hoy se extrena! 🎉",
            $days === 1 => "Mañana se estrena 🎬",
            $days < 7 => "esta semana se estrena 🍿",
            $days < 30 => "este mes se estrena 🎥",
            default => "En $days días se estrena 📅",
        };
    }

    public static function fetch_and_create_movie(string $api_url): NextMovie
    {
        $result = file_get_contents($api_url);
        // convertir el json en un array asociativo
        $data = json_decode($result, true); // true para que lo convierta en un array asociativo
        return new self(
            $data["title"],
            $data["days_until"],
            $data["following_production"]["title"] ?? "Descconocido", // si no existe el valor, se asigna un valor por defecto
            $data["release_date"],
            $data["poster_url"],
            $data["overview"],
        );
    }

    // metodo para obtener los datos de la clase 
    public function get_data() {
        return get_object_vars($this);
    }
}
