<?php

namespace Config;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        try {
            if (self::$instance === null) {
                $path = __DIR__ . '/midatabase.sqilitedb';
                $dsn = "sqlite:$path";
                try {
                    self::$instance = new PDO($dsn);
                    self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Database connection error: ' . $e->getMessage()]);
                    exit;
                }
            }
            return self::$instance;
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error: ' . $th->getMessage()]);
            exit;
        }
    }
}
