<?php
require_once __DIR__ . '/vendor/autoload.php';

// Ejecutar cada archivo de migración manualmente (o automáticamente si lo prefieres)
require_once __DIR__ . '/src/Modules/Users/Migrations/create_users_table.php';
require_once __DIR__ . '/src/Modules/Tasks/Migrations/create_tasks_table.php';
// Agrega aquí otras tablas...

echo "Migraciones ejecutadas con éxito.\n";


?>