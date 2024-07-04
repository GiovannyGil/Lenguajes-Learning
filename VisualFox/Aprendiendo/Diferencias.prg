* SetLibraryTO vs SetProcedureTo

* SetLibraryTO
Set Library To SenderManager
* VS
Set Procedure To [PrgManager] Additive



* Procedure vs Function
DEFINE Class Controlador As Custom
    Hidden AtributoControlador

    Hidden Procedure Init(NuevoAtributo As Any)
        This.AtributoControlador(NuevoAtributo)
        This.VisualizarVariable()
    EndProc

    Hidden Procedure VisualizarVariable()
        Wait Windows This.AtributoControlador
    EndProc


    * Procedure
    Hidden Procedure SetAtributoControlador(NuevoAtributo As Any)
        This.AtributoControlador = This.ControlarValorAtributo(NuevoAtributo)
    EndProc

    * Function
    Hidden Procedure ControlarValorAtributo(ValorPorVerificar As Any)
    Return Iif(IsNull(ValorPorVerificar) or Empty(ValorPorVerificar), [No Existe], ValorPorVerificar)
ENDDEFINE


* Modal vs NoModal

* No Modal -> Independiente
Public Otest2
Otest2 = CreateObject("Controlador")
Otest2.Show()

* Modal -> No Independiente
Local Otest
Otest = CreateObject("Controlador")
Otest.Show(1)

DEFINE Class Formulario As Form
    Height = 500
    Width = 500
    Visible = .T.
ENDDEFINE