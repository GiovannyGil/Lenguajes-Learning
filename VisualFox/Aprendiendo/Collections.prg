* Collections

Local Otest
Otest = CreateObject("Controlador")
Otest.VisualizarELementoCredito(2) && ver el elemento dos de la colecion

DEFINE class Controlador as Custom
    Procedure Init()
        This.CrearColeccion()
        This.AñadirElementoPrueba()
    EndProc

    Procedure CrearColeccion()
        This.AddProperty("ColeccionCreditos", CreateObject("Collection"))
    EndProc

    Procedure AñadirElementoPrueba()
        this.ColeccionCreditos.Add("Credito1")
        this.ColeccionCreditos.Add("Credito2")
        this.ColeccionCreditos.Add("Credito3")
    EndProc

    Procedure VisualizarELementoCredito(idElemento As Integer)
        wait windows This.ColeccionCreditos[IdElemento] && Mostrar elemento segun el "ID"
    EndProc
ENDDEFINE

