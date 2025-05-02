<?php

use Src\Router;
use Modules\Tasks\Controllers\TasksController;

// Este archivo recibe $router desde el index.php
global $router;

$router->add('GET', '/tasks', [TasksController::class, 'getAll']);
$router->add('GET', '/tasks/{id}', [TasksController::class, 'getbyID']);
$router->add('POST', '/tasks', [TasksController::class, 'create']);
$router->add('PATCH', '/tasks/{id}', [TasksController::class, 'update']);
$router->add('DELETE', '/tasks/{id}', [TasksController::class, 'destroy']);
?>