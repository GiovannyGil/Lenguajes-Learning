<?php

namespace Modules\Tasks\Controllers;

use Modules\Tasks\TasksServices as Tasks;

class TasksController {
    public function getAll() {
        try {
            $tasks = new Tasks();
            $allTasks = $tasks->getAllTasks();
            return $allTasks;
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener las tareas: ' . $th->getMessage()]);
            exit;
        }
    }

    public function getbyID($id) {
        try {
            $tasks = new Tasks();
            return $tasks->getTaskById($id);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener la tarea: ' . $th->getMessage()]);
            exit;
        }
    }

    public function create() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $tasks = new Tasks();
            $success = $tasks->createTask($data);
            return ['success' => $success];
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear la tarea: ' . $th->getMessage()]);
            exit;
        }
    }

    public function update($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $tasks = new Tasks();
            $success = $tasks->updateTask($id, $data);
            return ['success' => $success];
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al actualizar la tarea: ' . $th->getMessage()]);
            exit;
        }
    }
    
    public function destroy($id) {
        try {
            $tasks = new Tasks();
            $success = $tasks->deleteTask($id);
            return ['success' => $success];
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar la tarea: ' . $th->getMessage()]);
            exit;
        }
    }
}
