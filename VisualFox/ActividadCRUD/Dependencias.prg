Local Otest
Otest = CREATEOBJECT("Dependencias") && establecer/ccrear la clase
*Otest.MostrarDependencias() && hacer uso del metodo



DEFINE CLASS Dependencias As Custom
    PROCEDURE Init()
        This.CrearColecionDependencias()
        This.AgregarDependencia()
        *This.MostrarDependencias()
    ENDPROC

    * crear la colecci�n
    PROCEDURE CrearColecionDependencias()
        This.AddProperty("ColectionDependencias", CREATEOBJECT("Collection"))
        This.AgregarDependencia()
    ENDPROC

    * Definir los elementos de la colecci�n
    PROCEDURE AgregarDependencia()
        This.ColectionDependencias.Add("Lenguaje")
        This.ColectionDependencias.Add("Artes 1")
        This.ColectionDependencias.Add("Ingles")
        This.ColectionDependencias.Add("Matematicas")
        This.ColectionDependencias.Add("Historia")
    ENDPROC

    * Mostrar los elementos de la colecci�n
    PROCEDURE MostrarDependencias()
        LOCAL i
        * recorrer la colecci�n y ver la lista impresa
        FOR i = 1 TO This.ColectionDependencias.Count
            ? This.ColectionDependencias.Item(i) && mostrar el elemento
        NEXT
    ENDPROC
ENDDEFINE