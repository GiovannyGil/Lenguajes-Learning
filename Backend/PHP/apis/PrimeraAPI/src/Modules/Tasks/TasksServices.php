<?php

namespace Modules\Tasks;

use Config\Database;
use PDO;


class TasksServices {
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

    public function getAllTasks(): array {
        try {
            $stmt = $this->db->query("SELECT * FROM tasks WHERE deletedAt IS NULL");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener las tareas: ' . $th->getMessage()]);
            exit;
        }
    }

    public function getTaskById(int $id): ?array {
        try {
            $stmt = $this->db->prepare("SELECT * FROM tasks WHERE id = ? AND deletedAt IS NULL");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener la tarea: ' . $th->getMessage()]);
            exit;
        }
    }

    public function createTask(array $data): bool {
        try {
            $stmt = $this->db->prepare("INSERT INTO tasks (nombre, descripcion, tipo) VALUES (?, ?, ?)");
            return $stmt->execute([
                $data['nombre'],
                $data['descripcion'],
                $data['tipo']
            ]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear la tarea: ' . $th->getMessage()]);
            exit;
        }
    }

    public function updateTask(int $id, array $data): bool {
        try {
            $stmt = $this->db->prepare("UPDATE tasks SET nombre = ?, descripcion = ?, tipo = ? WHERE id = ?");
            return $stmt->execute([
                $data['nombre'],
                $data['descripcion'],
                $data['tipo'],
                $id
            ]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al actualizar la tarea: ' . $th->getMessage()]);
            exit;
        }
    }

    public function deleteTask(int $id): bool {
        try {
            $stmt = $this->db->prepare("UPDATE tasks SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?");
            return $stmt->execute([$id]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar la tarea: ' . $th->getMessage()]);
            exit;
        }
    }
}