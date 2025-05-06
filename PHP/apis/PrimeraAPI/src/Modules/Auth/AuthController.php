<?php

namespace Modules\Auth;

use Modules\Auth\AuthService;

class AuthController
{
    private AuthService $authService;

    public function __construct()
    {
        try {
            $this->authService = new AuthService();
        } catch (\Throwable $th) {
            // Manejo de errores, puedes lanzar una excepción o registrar el error
            http_response_code(500);
            echo json_encode(['error' => 'Error al conectar a la base de datos.']);
            error_log($th->getMessage());
            exit;
        }
    }

    public function register()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $success = $this->authService->register($data);
            echo json_encode(['success' => $success]);
        } catch (\Throwable $th) {
            // Manejo de errores, puedes lanzar una excepción o registrar el error
            http_response_code(500);
            echo json_encode(['error' => 'Error al registrar el usuario.']);
            error_log($th->getMessage());
            exit;
        }
    }

    public function login()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $token = $this->authService->login($data['email'], $data['clave']);

            if ($token) {
                echo json_encode(['token' => $token]);
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'Credenciales inválidas']);
            }
        } catch (\Throwable $th) {
            // Manejo de errores, puedes lanzar una excepción o registrar el error
            http_response_code(500);
            echo json_encode(['error' => 'Error al iniciar sesión.']);
            error_log($th->getMessage());
            exit;
        }
    }

    public function logout()
    {
        try {
            $this->authService->logout();
            echo json_encode(['success' => true, 'message' => 'Sesión cerrada correctamente']);;
        } catch (\Throwable $th) {
            // Manejo de errores, puedes lanzar una excepción o registrar el error
            http_response_code(500);
            echo json_encode(['error' => 'Error al cerrar sesión.']);
            error_log($th->getMessage());
            exit;
        }
    }
}
