<?php
// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Autoload de Composer
require_once __DIR__ . '/vendor/autoload.php';

// llamar a la clase Router global
use Src\Router;

// Instanciar el router global
$router = new Router();

// Cargar rutas de cada módulo
require_once __DIR__ . '/src/Modules/Users/routes.php';
require_once __DIR__ . '/src/Modules/Auth/routes.php';
require_once __DIR__ . '/src/Modules/Tasks/routes.php';

// Ejecutar en base a la petición
$router->dispatch();
