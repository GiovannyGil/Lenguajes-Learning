* test_controlador.prg

SET PROCEDURE TO controlador ADDITIVE
SET PROCEDURE TO TareaDTO ADDITIVE
SET PROCEDURE TO Grupos ADDITIVE
SET PROCEDURE TO Dependencias ADDITIVE
SET PROCEDURE TO Tareas ADDITIVE

* Test inicialización del controlador
PROCEDURE Test_InitControlador()
    LOCAL oControlador
    oControlador = CREATEOBJECT("Controlador")
    oControlador.Init()

    * Verificar que las colecciones se crearon correctamente
    ASSERT NOT ISNULL(oControlador.ColeccionTareas)
    ASSERT oControlador.Grupos.ColectionGrupos.Count = 5
    ASSERT oControlador.Dependencias.ColectionDependencias.Count = 5
ENDPROC

* Test agregar tarea
PROCEDURE Test_AgregarTarea()
    LOCAL oControlador
    oControlador = CREATEOBJECT("Controlador")
    oControlador.Init()

    oControlador.AgregarTarea(4, "TAREA 4", "Digital", "Lenguaje", "DESCRIPCION T4")
    
    * Verificar que la tarea se haya agregado correctamente
    LOCAL oTarea
    oTarea = oControlador.LeerTarea(4)
    ASSERT NOT ISNULL(oTarea)
    ASSERT oTarea.Nombre = "TAREA 4"
ENDPROC

* Test leer tarea
PROCEDURE Test_LeerTarea()
    LOCAL oControlador
    oControlador = CREATEOBJECT("Controlador")
    oControlador.Init()

    LOCAL oTarea
    oTarea = oControlador.LeerTarea(1)
    
    * Verificar que la tarea se haya leído correctamente
    ASSERT NOT ISNULL(oTarea)
    ASSERT oTarea.Nombre = "TAREA 1"
ENDPROC

* Test actualizar tarea
PROCEDURE Test_ActualizarTarea()
    LOCAL oControlador
    oControlador = CREATEOBJECT("Controlador")
    oControlador.Init()

    oControlador.ActualizarTarea(1, "TAREA 1 Actualizada", "Digital", "Matematicas", "Descripcion Actualizada")
    
    * Verificar que la tarea se haya actualizado correctamente
    LOCAL oTarea
    oTarea = oControlador.LeerTarea(1)
    ASSERT NOT ISNULL(oTarea)
    ASSERT oTarea.Nombre = "TAREA 1 Actualizada"
ENDPROC

* Test eliminar tarea
PROCEDURE Test_EliminarTarea()
    LOCAL oControlador
    oControlador = CREATEOBJECT("Controlador")
    oControlador.Init()

    oControlador.EliminarTarea(1)
    
    * Verificar que la tarea se haya eliminado correctamente
    LOCAL oTarea
    oTarea = oControlador.LeerTarea(1)
    ASSERT ISNULL(oTarea)
ENDPROC

* Ejecutar todas las pruebas
Test_InitControlador()
Test_AgregarTarea()
Test_LeerTarea()
Test_ActualizarTarea()
Test_EliminarTarea()
