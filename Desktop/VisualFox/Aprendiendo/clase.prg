
*<summary>
*	instanciar una clase
*</summary>

PUBLIC Otest
Otest = CREATEOBJECT("ClasePrueba")

* DEFINIR UNA CLASE
DEFINE CLASS ClasePrueba as Form

	*Atributos
	
	*<summary>
	* 	Formulario padre
	*</summary>
	HIDDEN OparentForm
	
	*<summary>
	* 	alto del formulario
	*</summary>
	Height = 800
	
	*<summary>
	* 	ancho del formulario
	*</summary>
	Width = 500 
	
	*<summary>
	* 	Visivilidad del formulario
	*</summary>
	Visible = .T.

	* Titulo de la ventana
	Caption = "Ventana Clase prueba"

	Procedure Init()
	
	EndProc

	*Metodos
	
	*<summary>
	* 	Metodo CualquierCosa
	*</summary>
	FUNCTION CualquierCosa()
	
	*<summary>
	* 	Metodo CualquierCosa2
	*</summary>
	PROTECTED PROCEDURE CualquierCosa2()
	
	*<summary>
	* 	Metodo Constructor
	*</summary>
	PROCEDURE Init()
		this.Show() && permitir que el formulario se muestre
	ENDPROC

ENDDEFINE