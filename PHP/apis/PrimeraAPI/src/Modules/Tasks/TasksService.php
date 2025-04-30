<?php

namespace Modules\Tasks;

use Config\Database;
use PDO;


class TasksService {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAllTasks(): array {
        $stmt = $this->db->query("SELECT * FROM tasks WHERE deletedAt IS NULL");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTaskById(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM tasks WHERE id = ? AND deletedAt IS NULL");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function createTask(array $data): bool {
        $stmt = $this->db->prepare("INSERT INTO tasks (nombre, descripcion, tipo) VALUES (?, ?, ?)");
        return $stmt->execute([
            $data['nombre'], 
            $data['descripcion'],
            $data['tipo']
        ]);
    }

    public function updateTask(int $id, array $data): bool {
        $stmt = $this->db->prepare("UPDATE tasks SET nombre = ?, descripcion = ?, tipo = ? WHERE id = ?");
        return $stmt->execute([
            $data['nombre'], 
            $data['descripcion'],
            $data['tipo'],
            $id
        ]);
    }

    public function deleteTask(int $id): bool {
        $stmt = $this->db->prepare("UPDATE tasks SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?");
        return $stmt->execute([$id]);
    }
}