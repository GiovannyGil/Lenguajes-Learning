<?php

namespace Modules\Tasks\Controllers;

use Modules\Tasks\Services\Tasks;

class TasksController {
    public function getAll() {
        $tasks = new Tasks();
        return $tasks->getAllTasks();
    }

    public function getbyID($id) {
        $tasks = new Tasks();
        return $tasks->getTaskById($id);
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        $tasks = new Tasks();
        $success = $tasks->createTask($data);
        return ['success' => $success];
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $tasks = new Tasks();
        $success = $tasks->updateTask($id, $data);
        return ['success' => $success];
    }
    
    public function destroy($id) {
        $tasks = new Tasks();
        $success = $tasks->deleteTask($id);
        return ['success' => $success];
    }
}
