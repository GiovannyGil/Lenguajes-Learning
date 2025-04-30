<?php

namespace Src;

class Router {
    private array $routes = [];

    // Añadir rutas (GET, POST, etc)
    public function add(string $method, string $path, callable|array $handler): void {
        $method = strtoupper($method);
        $path = rtrim($path, '/'); // <- Normaliza la ruta que agregas
        if ($path === '') {
            $path = '/';
        }
        $this->routes[$method][$path] = $handler;
    }

    // Ejecutar la ruta actual
    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = rtrim($uri, '/') ?: '/';
        if (isset($this->routes[$method][$uri])) {
            $handler = $this->routes[$method][$uri];
            if (is_array($handler)) {
                [$class, $methodName] = $handler;
                $controller = new $class();
                echo json_encode($controller->$methodName());
            } else {
                echo json_encode($handler());
            }
            return;
        }
    
        // Ruta dinámica
        foreach ($this->routes[$method] as $route => $handler) {
            $pattern = preg_replace('#\{[a-zA-Z_][a-zA-Z0-9_]*\}#', '([^/]+)', $route);
            if (preg_match('#^' . $pattern . '$#', $uri, $matches)) {
                array_shift($matches); // Eliminar match completo
                if (is_array($handler)) {
                    [$class, $methodName] = $handler;
                    $controller = new $class();
                    echo json_encode($controller->$methodName(...$matches));
                } else {
                    echo json_encode($handler(...$matches));
                }
                return;
            }
        }
    
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada']);
    }
    
}
