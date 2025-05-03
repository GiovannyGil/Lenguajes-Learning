<?php

namespace Modules\Auth\Middleware;

class AuthMiddleware
{
    public static function handle()
    {
        // Iniciar sesión si no está iniciada
        $headers = getallheaders();

        // Verificar si la sesión está iniciada
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Acceso no autorizado. Token no proporcionado.']);
            exit;
        }

        // Verificar si el token está presente en los headers
        $token = trim(str_replace('Bearer', '', $headers['Authorization']));

        // Validar token simple con sesión (o puedes usar JWT)
        if (!isset($_SESSION['token']) || $_SESSION['token'] !== $token) {
            http_response_code(401);
            echo json_encode(['error' => 'Token inválido o expirado.']);
            exit;
        }
    }
}
