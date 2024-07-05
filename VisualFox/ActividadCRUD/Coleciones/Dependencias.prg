Local Otest
Otest = CREATEOBJECT("Dependencias") && establecer/ccrear la clase
Otest.MostrarDependencias() && hacer uso del metodo



DEFINE CLASS Dependencias As Custom
    PROCEDURE Init()
        This.CrearColecionDependencias()
        This.AgregarDependencia()
        This.MostrarDependencias()
    ENDPROC

    * crear la colección
    PROCEDURE CrearColecionDependencias()
        This.AddProperty("ColectionDependencias", CREATEOBJECT("Collection"))
    ENDPROC

    * Definir los elementos de la colección
    PROCEDURE AgregarDependencia()
        This.ColectionDependencias.Add("Dependencia 1")
        This.ColectionDependencias.Add("Dependencia 2")
        This.ColectionDependencias.Add("Dependencia 3")
        This.ColectionDependencias.Add("Dependencia 4")
        This.ColectionDependencias.Add("Dependencia 5")
    ENDPROC

    * Mostrar los elementos de la colección
    PROCEDURE MostrarDependencias()
        LOCAL i
        * recorrer la colección y ver la lista impresa
        FOR i = 1 TO This.ColectionDependencias.Count
            ? This.ColectionDependencias.Item(i)
        NEXT
    ENDPROC
ENDDEFINE