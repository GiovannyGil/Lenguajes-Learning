<?php

use Src\Router;
use Modules\Users\UserController;
use Modules\Auth\Middleware\AuthMiddleware;

// Este archivo recibe $router desde el index.php
global $router;

// Otra forma de manejar la autenticación es encapsulando el controlador en una función anónima
function withAuth(callable $callback)
{
    return function (...$args) use ($callback) {
        AuthMiddleware::handle();
        return call_user_func_array($callback, $args);
    };
}

// definición de rutas para el módulo de usuarios
$router->add('GET', '/api/users', withAuth([new UserController(), 'getAll']));
$router->add('GET', '/api/users/{id}', withAuth([new UserController(), 'getbyID']));
$router->add('POST', '/api/users', withAuth([new UserController(), 'create']));
$router->add('PATCH', '/api/users/{id}', withAuth([new UserController(), 'update']));
$router->add('DELETE', '/api/users/{id}', withAuth([new UserController(), 'destroy']));
