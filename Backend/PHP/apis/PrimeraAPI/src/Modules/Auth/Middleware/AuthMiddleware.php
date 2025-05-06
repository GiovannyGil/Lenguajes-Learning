<?php

namespace Modules\Auth\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    public static function handle()
    {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Acceso no autorizado. Token no proporcionado.']);
            exit;
        }

        $token = trim(str_replace('Bearer', '', $headers['Authorization']));

        $secretKey = 'tu_clave_secreta'; // Usa la misma clave que usaste al generar el token

        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

            // Aquí podrías guardar los datos decodificados para usarlos luego
            $_REQUEST['auth_user'] = (array) $decoded;
        } catch (\Throwable $th) {
            http_response_code(401);
            echo json_encode(['error' => 'Token inválido o expirado.']);
            exit;
        }
    }
}
