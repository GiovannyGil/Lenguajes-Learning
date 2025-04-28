<?php

use Src\Router;
use Modules\Users\Controllers\UserController;

// Este archivo recibe $router desde el index.php
global $router;

$router->add('GET', '/users', [UserController::class, 'getAll']);
$router->add('GET', '/users/{id}', [UserController::class, 'getbyID']);
$router->add('POST', '/users', [UserController::class, 'create']);
$router->add('PATCH', '/users/{id}', [UserController::class, 'update']);
$router->add('DELETE', '/users/{id}', [UserController::class, 'destroy']);
?>