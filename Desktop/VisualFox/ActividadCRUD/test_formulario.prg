* test_formulario.prg

SET PROCEDURE TO controlador ADDITIVE
SET PROCEDURE TO grupos ADDITIVE
SET PROCEDURE TO Dependencias ADDITIVE
SET PROCEDURE TO TareaDTO ADDITIVE
SET PROCEDURE TO Tareas ADDITIVE
SET PROCEDURE TO formulario ADDITIVE

* Test inicialización del formulario
PROCEDURE Test_InitFormulario()
    LOCAL oForm
    oForm = CREATEOBJECT("FormularioCRUD")
    oForm.Init()

    * Verificar que el formulario se haya inicializado correctamente
    ASSERT NOT ISNULL(oForm.Controlador)
    ASSERT oForm.Controlador.ColeccionTareas.Count = 3
    ASSERT oForm.cbxGrupo.ListCount = 5
    ASSERT oForm.cbxDependencia.ListCount = 5
ENDPROC

* Test función ListarTareas
PROCEDURE Test_ListarTareas()
    LOCAL oForm
    oForm = CREATEOBJECT("FormularioCRUD")
    oForm.Init()
    oForm.ListarTareas()

    * Verificar que las tareas se listaron correctamente en el grid
    GO TOP IN curTareas
    ASSERT RECNO("curTareas") = 1
    ASSERT curTareas.IDTarea = 1
    ASSERT curTareas.Nombre = "TAREA 1"
ENDPROC

* Ejecutar todas las pruebas
Test_InitFormulario()
Test_ListarTareas()
