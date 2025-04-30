<?php

use Src\Router;
use Modules\Users\UserController;

function loadUserRoutes(Router $router): void {
    $router->add('GET', '/api/users', [UserController::class, 'getAll']);
    $router->add('GET', '/api/users/{id}', [UserController::class, 'getbyID']);
    $router->add('POST', '/api/users', [UserController::class, 'create']);
    $router->add('PATCH', '/api/users/{id}', [UserController::class, 'update']);
    $router->add('DELETE', '/api/users/{id}', [UserController::class, 'destroy']);
}