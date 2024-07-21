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
    PROCEDURE CrearColecionGrupos()
        This.AddProperty("Grupos", CreateObject("Grupos"))
        This.Grupos.CrearColecionGrupos()
    ENDPROC

    PROCEDURE CrearColecionDependencias()
        This.AddProperty("Dependencias", CreateObject("Dependencias"))
        This.Dependencias.CrearColecionDependencias()
    ENDPROC

   * Agrega una nueva tarea a la colección
   	Function AgregarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)
        This.Tareas.ColeccionTareas.Add(CREATEOBJECT("TareaDTO", sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion))
    Endfunc

    * Validar la existencia de una tarea por su ID
    *!*	 Procedure ValidarExistenciaTarea
    *!*	     Parameters IdToEvaluated As Integer 

    *!*	     Return Iif(type(This.ColeccionTareas.Item(IdToEvaluated)) != [O], .f., .t.) 

    
    *!*	 Endproc

        * Validar la existencia de una tarea por su ID
        FUNCTION ValidarExistenciaTarea(IdToEvaluated As Integer) AS Logical
            LOCAL oTarea
            oTarea = This.LeerTarea(IdToEvaluated)
            RETURN NOT ISNULL(oTarea)
        ENDFUNC

    * Lee una tarea de la colección por su ID
    PROCEDURE LeerTarea(IdToEvaluated)
        LOCAL oTarea, i
        FOR i = 1 TO This.ColeccionTareas.Count
            oTarea = This.ColeccionTareas.Item(i)
            IF oTarea.IDTarea = IdToEvaluated
                RETURN oTarea
            ENDIF
        ENDFOR
        RETURN .NULL.  && No se encontró la tarea
    ENDPROC
    

    * Actualiza una tarea existente en la colección
    PROCEDURE ActualizarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)
        * Verificar que la tarea exista
        IF NOT This.ValidarExistenciaTarea(sIDTarea)
            RETURN .F.
        ENDIF
        
        * Actualizar la tarea con los nuevos valores
        LOCAL oTarea
        oTarea = This.ColeccionTareas.Item(sIDTarea)
        oTarea.Nombre = sNombre
        oTarea.Grupo = sGrupo
        oTarea.Dependencia = sDependencia
        oTarea.Descripcion = sDescripcion
        
        RETURN .T.
    ENDPROC


    * Elimina una tarea de la colección por su ID
    PROCEDURE EliminarTarea(sIDTarea)
        * Verificar que la tarea exista
        IF Not This.ValidarExistenciaTarea(sIDTarea)
            RETURN .F.
        ENDIF

        * Eliminar la tarea de la colección
        
        This.ColeccionTareas.Remove(sIDTarea)
        RETURN .T.
    ENDPROC

    *Encapzulacion de error
    PROCEDURE Error(nerror as Integer, cmethod as String, nline as Integer)
        MESSAGEBOX("Código Error: " + ALLTRIM(STR(nerror)) + Chr(13) + "Metodo: " + cmethod + CHR(13) + "Linea: " + ALLTRIM(STR(nline)), 64, "Visualización de Errores")
    ENDPROC


    * TODO: (MIGUEL DIAZ): Extender la funcionalidad de los 3 botones del crud para que contemplen la validacion desde su existencia, previo a su respectiva extension en el controlador.
ENDDEFINE