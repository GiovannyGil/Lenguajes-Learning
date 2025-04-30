<?php

use Src\Router;
use Modules\Tasks\TasksController;

// Este archivo recibe $router desde el index.php
global $router;

$router->add('GET', '/api/tasks', [TasksController::class, 'getAll']);
$router->add('GET', '/api/tasks/{id}', [TasksController::class, 'getbyID']);
$router->add('POST', '/api/tasks', [TasksController::class, 'create']);
$router->add('PATCH', '/api/tasks/{id}', [TasksController::class, 'update']);
$router->add('DELETE', '/api/tasks/{id}', [TasksController::class, 'destroy']);
?>