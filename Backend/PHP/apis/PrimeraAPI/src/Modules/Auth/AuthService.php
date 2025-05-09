<?php

namespace Modules\Auth;

use PDO;
use Config\Database;
use Firebase\JWT\JWT;

class AuthService {
    private PDO $db;

    public function __construct() {
        try {
            $this->db = Database::getConnection();
            session_start();
        } catch (\Throwable $th) {
            // Manejo de errores, puedes lanzar una excepción o registrar el error
            http_response_code(500);
            echo json_encode(['error' => 'Error al conectar a la base de datos.']);
            error_log($th->getMessage());
            exit;
        }
    }

    // Método para registrar un nuevo usuario
    public function register(array $data): bool {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO users (
                    nombres, apellidos, nombre_usuario, email, clave, edad, celular, direccion, fecha_nacimiento, sexo
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");

            $hashedPassword = password_hash($data['clave'], PASSWORD_BCRYPT);

            return $stmt->execute([
                $data['nombres'],
                $data['apellidos'],
                $data['nombre_usuario'],
                $data['email'],
                $hashedPassword,
                $data['edad'],
                $data['celular'],
                $data['direccion'],
                $data['fecha_nacimiento'],
                $data['sexo']
            ]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al registrar el usuario.']);
            error_log($th->getMessage());
            return false;
        }
    }

    // Método para iniciar sesión
    public function login($email, $clave) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($clave, $user['clave'])) {
                $payload = [
                    'sub' => $user['id'],
                    'email' => $user['email'],
                    'exp' => time() + (60 * 60) // expira en 1 hora
                ];

                $jwt = JWT::encode($payload, 'tu_clave_secreta', 'HS256');
                return $jwt;
            }

            return false;
        } catch (\Throwable $th) {
            // Manejo de errores, puedes lanzar una excepción o registrar el error
            http_response_code(500);
            echo json_encode(['error' => 'Error al iniciar sesión.']);
            error_log($th->getMessage());
            return null;
        }
    }

    // Método para verificar si el usuario está autenticado
    public function logout(): void {
        try {
            session_destroy();
        } catch (\Throwable $th) {
            // Manejo de errores, puedes lanzar una excepción o registrar el error
            http_response_code(500);
            echo json_encode(['error' => 'Error al cerrar sesión.']);
            error_log($th->getMessage());
        }
    }
}
