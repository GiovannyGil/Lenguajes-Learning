Local Otest
Otest = CREATEOBJECT("Grupos") && establecer/ccrear la clase
* Otest.MostrarGrupos() && hacer uso del metodo

DEFINE CLASS Grupos As Custom
    PROCEDURE Init()
        This.CrearColecionGrupos()
        * This.AgregarGrupo()
        *This.MostrarGrupos()
    ENDPROC

    * crear la colecci�n
    PROCEDURE CrearColecionGrupos()
        This.AddProperty("ColectionGrupos", CREATEOBJECT("Collection"))
        This.AgregarGrupo()
    ENDPROC

    * Definir los elementos de la colecci�n
    PROCEDURE AgregarGrupo()
        This.ColectionGrupos.Add("Manuales")
        This.ColectionGrupos.Add("Ejecutiva")
        This.ColectionGrupos.Add("Artesana")
        This.ColectionGrupos.Add("Digital")
        This.ColectionGrupos.Add("Contable")
    ENDPROC

    * Mostrar los elementos de la colecci�n
    PROCEDURE MostrarGrupos()
        LOCAL i
        * recorrer la colecci�n y ver la lista impresa
        FOR i = 1 TO This.ColectionGrupos.Count
            ? This.ColectionGrupos.Item(i) && mostrar el elemento
        NEXT
    ENDPROC

    *Encapzulacion de error
    PROCEDURE Error(nerror as Integer, cmethod as String, nline as Integer)
        MESSAGEBOX("C�digo Error: " + ALLTRIM(STR(nerror)) + Chr(13) + "Metodo: " + cmethod + CHR(13) + "Linea: " + ALLTRIM(STR(nline)), 64, "Visualizaci�n de Errores")
    ENDPROC
ENDDEFINE