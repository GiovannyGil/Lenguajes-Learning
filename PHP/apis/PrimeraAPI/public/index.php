<?php
require_once __DIR__ . '/../vendor/autoload.php';

use src\Router;
use Modules\Users\UserController;

$router = new Router();

// Cargar rutas de cada módulo
require_once __DIR__ . '/../src/Modules/Users/routes.php';
require_once __DIR__ . '/../src/Modules/Auth/routes.php';
require_once __DIR__ . '/../src/Modules/Products/routes.php';

// Ejecutar en base a la petición
$router->dispatch();
?>