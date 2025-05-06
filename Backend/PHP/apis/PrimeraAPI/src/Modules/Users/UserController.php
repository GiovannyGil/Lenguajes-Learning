<?php

namespace Modules\Users;

use Modules\Users\UserService as User;

class UserController {
    public function getAll()
    {
        try {
            $user = new User();
            $users = $user->getAllUsers();
            return $users;
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener los usuarios: ' . $th->getMessage()]);
            exit;
        }
    }

    public function getbyID($id)
    {
        try {
            $user = new User();
            $userData = $user->getUserById($id);
            if ($userData) {
                return $userData;
            } else {
                http_response_code(404);
                return ['error' => 'Usuario no encontrado'];
            }
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener el usuario: ' . $th->getMessage()]);
            exit;
        }
    }

    public function create()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $user = new User();
            $success = $user->createUser($data);
            return ['success' => $success];
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear el usuario: ' . $th->getMessage()]);
            exit;
        }
    }

    public function update($id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $user = new User();
            $success = $user->updateUser($id, $data);
            return ['success' => $success];
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al actualizar el usuario: ' . $th->getMessage()]);
            exit;
        }
    }

    public function destroy($id)
    {
        try {
            $user = new User();
            $success = $user->deleteUser($id);
            return ['success' => $success];
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar el usuario: ' . $th->getMessage()]);
            exit;
        }
    }
}
