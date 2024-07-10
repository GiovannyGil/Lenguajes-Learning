SET PROCEDURE TO Dependencias ADDITIVE
SET PROCEDURE TO Grupos ADDITIVE
SET PROCEDURE TO TareaDTO ADDITIVE
SET PROCEDURE TO Tareas ADDITIVE


DEFINE class Controlador As Custom
    
    ColeccionTareas = NULL

    PROCEDURE Init()
        This.CrearColeccionTareas()
        This.CrearColecionGrupos()
        This.CrearColecionDependencias()
    ENDPROC

    * Crear colección de tareas utilizando la instancia de Tareas y obtener/Listar las tareas
    PROCEDURE CrearColeccionTareas()
        This.AddProperty("Tareas", CREATEOBJECT("Tareas"))
        This.Tareas.CrearColeccionTareas()
        This.Tareas.AgregarTareaDefecto()  && Agregar las tareas por defecto
        This.ColeccionTareas = This.Tareas.ColeccionTareas
    ENDPROC

    *!*	 obtener/traer la colecion de los grupos y dependencias
    Protected PROCEDURE CrearColecionGrupos()
        This.AddProperty("Grupos", CreateObject("Grupos"))
        This.Grupos.CrearColecionGrupos()
    ENDPROC

    Protected PROCEDURE CrearColecionDependencias()
        This.AddProperty("Dependencias", CreateObject("Dependencias"))
        This.Dependencias.CrearColecionDependencias()
    ENDPROC

   * Agrega una nueva tarea a la colección
   	Function AgregarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)
        This.Tareas.ColeccionTareas.Add(CREATEOBJECT("TareaDTO", sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion))
    Endfunc

    Protected Procedure ValidarExistenciaTarea
        Parameters IdToEvaluated As Integer 

        Return Iif(Vartype(This.ColeccionTareas.Item(IdToEvaluated)) != [O], .f., .t.) 
    Endproc

    * Lee una tarea de la colección por su ID
    PROCEDURE LeerTarea(sIDTarea)
        If This.ValidarExistenciaTarea(sIDTarea)
            Return
        Endif

        This.Parent.txtID.Value = This.ColeccionTareas.Item(i).IDTarea
        This.Parent.txtNombre.Value = This.ColeccionTareas.Item(i).Nombre
        This.Parent.cboGrupo.Value = This.ColeccionTareas.Item(i).Grupo
        This.Parent.cboDependencia.Value = This.ColeccionTareas.Item(i).Dependencia
        This.Parent.txtDescripcion.Value = This.ColeccionTareas.Item(i).Descripcion
    ENDPROC

    * Actualiza una tarea existente en la colección
    PROCEDURE ActualizarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)
        If This.ValidarExistenciaTarea(sIDTarea)
            Return
        Endif
    ENDPROC

    * Elimina una tarea de la colección por su ID
    PROCEDURE EliminarTarea(sIDTarea)
        If This.ValidarExistenciaTarea(sIDTarea)
            Return
        Endif
    ENDPROC



    * TODO: (MIGUEL DIAZ): Extender la funcionalidad de los 3 botones del crud para que contemplen la validacion desde su existencia, previo a su respectiva extension en el controlador.

ENDDEFINE