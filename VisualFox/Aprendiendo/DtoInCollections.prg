* Collections

Local Otest
Otest = CreateObject("Controlador")
Otest = VisualizarPagareCredito(1) && ver el elemento dos de la colecion
Otest = VisualizarNombreAsociado(1)

DEFINE class Controlador as Custom
    Procedure Init()
        This.CrearColeccion()
        This.AñadirElementoPrueba()
    EndProc

    Procedure CrearColeccion()
        This.AddProperty("ColeccionCreditos", CreateObject("Collection"))
    EndProc

    Procedure AñadirElementoPrueba()
        this.ColeccionCreditos.Add(CreateObject("CreditosDto", "linea", "destino", "subdestino", "0001", "184552216", "Gio"))
    EndProc

    Procedure VisualizarPagareCredito(idElemento As Integer)
        wait windows This.ColeccionCreditos[IdElemento].pagare && Mostrar elemento segun el "ID"
    EndProc

    Procedure VisualizarNombreAsociado(idElemento As Integer)
    wait windows This.ColeccionCreditos[IdElemento].NombreAsociado && Mostrar elemento segun el "ID"
EndProc
ENDDEFINE


* Dtos = Objectos de Tranderencia de datos

DEFINE class CreditosDto As Custom
    Linea = []
    Destino = []
    SubDestino = []
    pagare = []
    CedulaAsociado = []
    NombreAsociado = []

    *!*	 Procedure Init()
    *!*	     This.Linea = "Linea"
    *!*	     This.Destino = "Destino"
    *!*	     This.SubDestino = "SubDestino"
    *!*	     This.pagare = "pagare"
    *!*	     This.CedulaAsociado = "CedulaAsociado"
    *!*	 EndProc

    Procedure Init(sLinea As String, sDestino As String, sSubDestino As String, sPagare As String, sCedulaAsociado As String, sNombreAsociado As String)
        This.Linea = sLinea
        This.Destino = sDestino
        This.SubDestino = sSubDestino
        This.pagare = sPagare
        This.CedulaAsociado = sCedulaAsociado
        This.NombreAsociado = sNombreAsociado
    EndProc
ENDDEFINE