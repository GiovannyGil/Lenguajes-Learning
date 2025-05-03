<?php

use Config\Database;

require_once __DIR__ . '/../../../Config/Database.php';

try {
    $db = Database::getConnection();

    //! Crear la tabla tasks si no existe
    /** *
     ** @param PDO $db Conexión a la base de datos
    ** @return void
    ** @throws Exception Si ocurre un error al crear la tabla
    ** tiene relación con la tabla users, de muchos a uno (un usauirio puede tener muchas tareas, pero una tarea solo puede pertenecer a un usuario)
    */
    
    $sql = "
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            nombre TEXT(30) NOT NULL,
            descripcion TEXT(100) NOT NULL,
            tipo TEXT(30) NOT NULL,
            estado TEXT(1) NOT NULL DEFAULT 1,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updatedAt TIMESTAMP DEFAULT NULL,
            deletedAt TIMESTAMP DEFAULT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )
    ";

    $db->exec($sql);
    echo "Tabla 'tasks' creada con éxito.\n";
} catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al crear la tabla tasks: ' . $th->getMessage()]);
    exit;
}


?>