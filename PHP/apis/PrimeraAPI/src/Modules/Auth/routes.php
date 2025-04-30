<?php

use Src\Router;
use Modules\Auth\AuthController;

function loadUserRoutes(Router $router): void {
    $router->add('POST', '/api/auth/login', [AuthController::class, 'login']);
    $router->add('POST', '/api/auth/register', [AuthController::class, 'register']);
}