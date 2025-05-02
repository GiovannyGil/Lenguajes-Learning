<?php

namespace Modules\Users\Services;

use Config\Database;
use PDO;

class User {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAllUsers(): array {
        $stmt = $this->db->query("SELECT * FROM users WHERE deletedAt IS NULL");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ? AND deletedAt IS NULL");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function createUser(array $data): bool {
        $stmt = $this->db->prepare("INSERT INTO users (nombres, apellidos, email, clave, edad, celular, direccion, fecha_nacimiento, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        return $stmt->execute([
            $data['nombres'], 
            $data['apellidos'],
            $data['email'],
            $data['clave'],
            $data['edad'],
            $data['celular'],
            $data['direccion'],
            $data['fecha_nacimiento'],
            $data['sexo']
        ]);
    }

    public function updateUser(int $id, array $data): bool {
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
    }

    public function deleteUser(int $id): bool {
        $stmt = $this->db->prepare("UPDATE users SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
