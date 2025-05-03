<?php

use Config\Database;

require_once __DIR__ . '/../../../Config/Database.php';

try {
    $db = Database::getConnection();

    //! Crear la tabla u8sers si no existe
    /** *
     ** @param PDO $db Conexión a la base de datos
     ** @return void
     ** @throws Exception Si ocurre un error al crear la tabla
     */
    
    $sql = "
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombres TEXT(30) NOT NULL,
        apellidos TEXT(30) NOT NULL,
        nombre_usuario TEXT(30) NOT NULL UNIQUE,
        email TEXT(30) NOT NULL UNIQUE,
        clave TEXT(30) NOT NULL ,
        edad INTEGER(3) NOT NULL,
        celular TEXT(11) NOT NULL,
        direccion TEXT(100) NOT NULL,
        fecha_nacimiento DATE NOT NULL,
        sexo TEXT(1) NOT NULL,
        estado INTEGER(1) NOT NULL DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP DEFAULT NULL,
        deletedAt TIMESTAMP DEFAULT NULL
    )
";

    $db->exec($sql);

    echo "Tabla 'users' creada con éxito.\n";
} catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al crear la tabla users: ' . $th->getMessage()]);
    exit;
}

?>