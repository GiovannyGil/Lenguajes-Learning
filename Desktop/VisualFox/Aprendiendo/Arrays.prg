* Arrays

Local Otest
Otest = CreateObject("Controlador")
Otest = VisualizarELementoCredito(2) && ver el elemento dos de la colecion


DEFINE class Controlador
    Dimension ColeccionCreditos[3,1]

    Procedure Init()
        This.AñadirElementoPrueba()
    EndProc

    Procedure AñadirElementoPrueba()
        This.ColeccionCreditos[1] = "Credito1"
        This.ColeccionCreditos[2] = "Credito2"
        This.ColeccionCreditos[3] = "Credito3"

        * permite todos el CRUD
        * UPDATE
        This.ColeccionCreditos[2] = "Credito4"
    EndProc

    Procedure VisualizarELementoCredito(idElemento As Integer)
        wait windows This.ColeccionCreditos[idElemento] && Mostrar elemento segun el "ID"
    EndProc
ENDDEFINE

*!*	 Dimension tareas[3,5]