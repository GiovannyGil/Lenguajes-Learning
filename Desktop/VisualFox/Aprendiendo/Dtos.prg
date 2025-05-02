* Dtos = Objectos de Tranderencia de datos


DEFINE class CreditosDto As Custom
    Linea = []
    Destino = []
    SubDestino = []
    pagare = []
    CedulaAsociado = []

    *!*	 Procedure Init()
    *!*	     This.Linea = "Linea"
    *!*	     This.Destino = "Destino"
    *!*	     This.SubDestino = "SubDestino"
    *!*	     This.pagare = "pagare"
    *!*	     This.CedulaAsociado = "CedulaAsociado"
    *!*	 EndProc

    Procedure Init(sLinea As String, sDestino As String, sSubDestino As String, sPagare As String, sCedulaAsociado As String)
        Linea = sLinea
        Destino = sDestino
        SubDestino = sSubDestino
        pagare = sPagare
        CedulaAsociado = sCedulaAsociado
    EndProc
ENDDEFINE