<?php

namespace Modules\Users;

use Config\Database;
use PDO;

// lógica de negocio para el módulo de usuarios
// Esta clase se encarga de interactuar con la base de datos y realizar operaciones CRUD Básico
class UserServices {
    private PDO $db;

    public function __construct() {
        try {
            $this->db = Database::getConnection();
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al conectar a la base de datos: ' . $th->getMessage()]);
            exit;
        }
    }

    public function getAllUsers(): array {
        try {
            $stmt = $this->db->query("SELECT * FROM users WHERE deletedAt IS NULL");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener los usuarios: ' . $th->getMessage()]);
            exit;
        }
    }

    public function getUserById(int $id): ?array {
        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ? AND deletedAt IS NULL");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener el usuario: ' . $th->getMessage()]);
            exit;
        }
    }

    public function createUser(array $data): bool {
        try {
            $stmt = $this->db->prepare("INSERT INTO users (nombres, apellidos, nombre_usuario email, clave, edad, celular, direccion, fecha_nacimiento, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

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
            echo json_encode(['error' => 'Error al crear el usuario: ' . $th->getMessage()]);
            exit;
        }
    }

    public function updateUser(int $id, array $data): bool {
        try {
            $stmt = $this->db->prepare("UPDATE users SET nombres = ?, apellidos = ?, email = ?, clave = ?, edad = ?, celular = ?, direccion = ?, fecha_nacimiento = ?, sexo = ? WHERE id = ?");
            return $stmt->execute([
                $data['nombres'],
                $data['apellidos'],
                $data['email'],
                $data['clave'],
                $data['edad'],
                $data['celular'],
                $data['direccion'],
                $data['fecha_nacimiento'],
                $data['sexo'],
                $id
            ]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al actualizar el usuario: ' . $th->getMessage()]);
            exit;
        }
    }

    public function deleteUser(int $id): bool {
        try {
            $stmt = $this->db->prepare("UPDATE users SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?");
            return $stmt->execute([$id]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar el usuario: ' . $th->getMessage()]);
            exit;
        }
    }
}
