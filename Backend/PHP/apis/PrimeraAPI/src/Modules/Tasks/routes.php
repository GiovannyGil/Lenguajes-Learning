<?php

use Src\Router;
use Modules\Tasks\TasksController;
use Modules\Auth\Middleware\AuthMiddleware;

// Este archivo recibe $router desde el index.php
global $router;

$router->add('GET', '/api/tasks', function() {
    AuthMiddleware::handle(); // Verifica el token antes de acceder a la ruta
    $controller = new TasksController();
    return $controller->getAll();
});

$router->add('GET', '/api/tasks/{id}', function ($id) {
    AuthMiddleware::handle();
    $controller = new TasksController();
    return $controller->getbyID($id);
});

$router->add('POST', '/api/tasks', function () {
    AuthMiddleware::handle();
    $controller = new TasksController();
    return $controller->create();
});

$router->add('PATCH', '/api/tasks/{id}', function ($id) {
    AuthMiddleware::handle();
    $controller = new TasksController();
    return $controller->update($id);
});

$router->add('DELETE', '/api/tasks/{id}', function ($id) {
    AuthMiddleware::handle();
    $controller = new TasksController();
    return $controller->destroy($id);
});


?>