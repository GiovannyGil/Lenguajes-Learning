Local Odto
Odto = CreateObject("TareaDTO")

DEFINE CLASS TareaDTO As Custom

    IDTarea = 0 && int/number
    Nombre = "" && String/Char
    Grupo = "" && String/Char
    Dependencia = "" && String/Char
    Descripcion = "" && String/Char

    PROCEDURE Init(sIDTarea As INTEGER, sNombre As String, sGrupo As String, sDependencia As String, sDescripcion As String)
        This.IDTarea = sIDTarea
        This.Nombre = sNombre
        This.Grupo = sGrupo
        This.Dependencia = sDependencia
        This.Descripcion = sDescripcion
    ENDPROC

    * Método para mostrar los detalles de la tarea
    PROCEDURE MostrarDetalles()
        ? "IDTarea: " + TRANSFORM(This.IDTarea)
        ? "Nombre: " + This.Nombre
        ? "Grupo: " + This.Grupo
        ? "Dependencia: " + This.Dependencia
        ? "Descripcion: " + This.Descripcion
    ENDPROC


    *Encapzulacion de error
    PROCEDURE Error(nerror as Integer, cmethod as String, nline as Integer)
        MESSAGEBOX("Còdigo Error: " + ALLTRIM(STR(nerror)) + Chr(13) + "Metodo: " + cmethod + CHR(13) + "Linea: " + ALLTRIM(STR(nline)), 64"Visualizaciòn de Errores")
    ENDPROC
    
ENDDEFINE
