SET PROCEDURE TO TareaDTO ADDITIVE

Local Otest
Otest = CREATEOBJECT("Tareas") && establecer/ccrear la clase
Otest.MostrarTareas() && hacer uso del metodo


DEFINE CLASS Tareas As Custom
    PROCEDURE Init()
        This.CrearColeccionTareas()
        This.AgregarTareaDefecto()
        This.MostrarTareas()
    ENDPROC


    * Crear la colecion de las tareas, usando el tareas.tdo
    PROCEDURE CrearColeccionTareas()
        This.AddProperty("ColeccionTareas", CREATEOBJECT("Collection"))
        This.AgregarTareaDefecto()
    ENDPROC


    * Agregar una tarea por defecto
    PROCEDURE AgregarTareaDefecto()
        This.ColeccionTareas.Add(CreateObject("TareaDTO", 1, "TAREA 1", "Manuales", "Ingles", "DESCRIPCION T1"))

        * This.ColeccionTareas.Add(CreateObject("TareaDTO", 2, "TAREA 2", "Ejecutiva", "Matematicas", "DESCRIPCION T2"))

        * This.ColeccionTareas.Add(CreateObject("TareaDTO", 3, "TAREA 3", "Artesana", "Historia", "DESCRIPCION T3"))
    ENDPROC


    * Mostrar los elementos de la colección
    PROCEDURE MostrarTareas()
        LOCAL i
        * recorrer la colección y ver la lista impresa
        FOR i = 1 TO This.ColeccionTareas.Count
            ? This.ColeccionTareas.Item(i) && mostrar el elemento
        NEXT
    ENDPROC
ENDDEFINE

