SET PROCEDURE TO TareaDTO ADDITIVE

Local Otest
Otest = CREATEOBJECT("Tareas") && establecer/crear la clase


DEFINE CLASS Tareas As Custom

    ColeccionTareas = NULL  && Definición de la propiedad para la colección de tareas
    
    PROCEDURE Init()
        This.CrearColeccionTareas()
        This.AgregarTareaDefecto()
        * This.MostrarTareas()  && Comentado para evitar imprimir detalles por defecto
    ENDPROC

    * Crear la colección de las tareas, usando el TareaDTO
    PROCEDURE CrearColeccionTareas()
        This.ColeccionTareas = CREATEOBJECT("Collection")
    ENDPROC

    * Agregar una tarea por defecto
    PROCEDURE AgregarTareaDefecto()
        This.ColeccionTareas.Add(CreateObject("TareaDTO", 1, "TAREA 1", "Manuales", "Ingles", "DESCRIPCION T1"))
        This.ColeccionTareas.Add(CreateObject("TareaDTO", 2, "TAREA 2", "Ejecutiva", "Matematicas", "DESCRIPCION T2"))
        This.ColeccionTareas.Add(CreateObject("TareaDTO", 3, "TAREA 3", "Artesana", "Historia", "DESCRIPCION T3"))
    ENDPROC

    * Mostrar los elementos de la colección
    PROCEDURE MostrarTareas()
        LOCAL i
        * Recorrer la colección y ver la lista impresa
        FOR i = 1 TO This.ColeccionTareas.Count
            This.ColeccionTareas.Item(i).MostrarDetalles() && Mostrar detalles del elemento
        NEXT
    ENDPROC
    
    *Encapzulacion de error
    PROCEDURE Error(nerror as Integer, cmethod as String, nline as Integer)
        MESSAGEBOX("Còdigo Error: " + ALLTRIM(STR(nerror)) + Chr(13) + "Metodo: " + cmethod + CHR(13) + "Linea: " + ALLTRIM(STR(nline)), 64"Visualizaciòn de Errores")
    ENDPROC
ENDDEFINE
