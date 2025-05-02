<?php

namespace Modules\Users\Controllers;

use Modules\Users\Services\User;

class UserController {
    public function getAll() {
        $user = new User();
        return $user->getAllUsers();
    }

    public function getbyID($id) {
        $user = new User();
        return $user->getUserById($id);
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        $user = new User();
        $success = $user->createUser($data);
        return ['success' => $success];
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $user = new User();
        $success = $user->updateUser($id, $data);
        return ['success' => $success];
    }
    
    public function destroy($id) {
        $user = new User();
        $success = $user->deleteUser($id);
        return ['success' => $success];
    }
}
