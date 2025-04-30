<?php

use Config\Database;

require_once __DIR__ . '/../../../Config/Database.php';

$db = Database::getConnection();

$sql = "
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT(30) NOT NULL,
        descripcion TEXT(100) NOT NULL,
        tipo TEXT(30) NOT NULL,
        estado TEXT(1) NOT NULL DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP DEFAULT NULL,
        deletedAt TIMESTAMP DEFAULT NULL
    )
";

$db->exec($sql);

echo "Tabla 'tasks' creada con éxito.\n";

?>