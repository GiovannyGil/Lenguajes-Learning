* Return = CREATEOBJECT("ControladorPruebas")
LOCAL Otest
Otest = CREATEOBJECT("ControladorHijo")

*Clase pruebas

DEFINE CLASS ControladorPruebas as Custom
	* Metodo Contructor
	PROCEDURE Init()
		this.AddProperty("Nombre", "Miguel")
		this.VisualizarNombreControlador("Diaz")
	ENDPROC

	* funcion para visualizar la propiedad
	PROTECTED PROCEDURE VisualizarNombreControlador(Apellido as Any)
		WAIT windows this.Nombre + " " + Apellido
	ENDPROC

	*Encapzulacion de error
	PROCEDURE Error(nerror as Integer, cmethod as String, nline as Integer)
		MESSAGEBOX("Còdigo Error: " + ALLTRIM(STR(nerror)) + Chr(13) + "Metodo: " + cmethod + CHR(13) + "Linea: " + ALLTRIM(STR(nline)), 64, "Visualizaciòn de Errores")
	ENDPROC
ENDDEFINE

* clase hijo, heredando de la clase pruebas
DEFINE CLASS ControladorHijo as ControladorPruebas
	PROCEDURE Init()
		DODEFAULT()
	ENDPROC
	
	PROTECTED PROCEDURE VisualizarNombreControlador(Apellido As Any)
		DODEFAULT(Apellido)
		WAIT windows Apellido
	ENDPROC
	
ENDDEFINE

