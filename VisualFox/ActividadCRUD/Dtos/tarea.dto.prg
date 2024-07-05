DEFINE CLASS TareaDTO As Custom

    IDTarea = [] && int/number
    Nombre = [] && String/Char
    Grupo = [] && String/Char
    Dependencia = [] && String/Char
    Descripcion = [] && String/Char


    PROCEDURE Init(sIDTarea As INTEGER, sNombre As String, sGrupo As String, sDependencia As String, sDescripcion As String)

        IDTarea = sIDTarea
        Nombre = sNombre
        Grupo = sGrupo
        Dependencia = sDependencia
        Descripcion = sDescripcion

    ENDPROC
ENDDEFINE
