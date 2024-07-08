SET PROCEDURE TO "Dependencias.prg" ADDITIVE
SET PROCEDURE TO "grupos.prg" ADDITIVE
SET PROCEDURE TO "TareaDTO.prg" ADDITIVE


DEFINE class Controlador As Custom

    PROCEDURE Init()
        This.CrearColeccionTareas()
        This.CrearColecionGrupos()
        This.CrearColecionDependencias()
    ENDPROC

    *!*	 crear colecion de las tareas
    PROCEDURE CrearColeccionTareas()
        This.AddProperty("ColeccionTareas", CreateObject("collection"))
        *!*	 This.AddProperty("Tareas", CreateObject("Tareas"))
        *!*	 This.Tareas.CrearColeccionTareas()
    ENDPROC

    *!*	 obtener/traer la colecion de los grupos y dependencias
    PROCEDURE CrearColecionGrupos()
        This.AddProperty("Grupos", CreateObject("Grupos"))
        This.Grupos.CrearColecionGrupos()
    ENDPROC

    PROCEDURE CrearColecionDependencias()
        This.AddProperty("Dependencias", CreateObject("Dependencias"))
        This.Dependencias.CrearColecionDependencias()
    ENDPROC

   * Agrega una nueva tarea a la colección
   PROCEDURE AgregarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)
        LOCAL oTarea
        oTarea = CREATEOBJECT("TareaDTO", sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)
        This.Tareas.Add(oTarea)
    ENDPROC

    * Lee una tarea de la colección por su ID
    PROCEDURE LeerTarea(sIDTarea)

    ENDPROC

    * Actualiza una tarea existente en la colección
    PROCEDURE ActualizarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)

    ENDPROC

    * Elimina una tarea de la colección por su ID
    PROCEDURE EliminarTarea(sIDTarea)

    ENDPROC

ENDDEFINE