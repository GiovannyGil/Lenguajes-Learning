PUBLIC Oform
Oform = CREATEOBJECT("Formulario")
Oform = AddObject("Controller", "ControladorPruebas", Oform) 
 
* Clase controladorPruebas

DEFINE CLASS ControladorPruebas as Custom

	*Atributo OparentForm (Formulario Padre)
	PROTECTED OparentForm
	
	*Metodo Constructor
	HIDDEN PROCEDURE Init(Formulario as Form)
		This.SetParentForm(Formulario)
		This.BindeoEventos()
	ENDPROC
	
	*Metodo SetParentForm
	HIDDEN PROCEDURE SetParentForm(Fomulario as Form)
		This.OparentForm = Formulario
	ENDPROC
	
	*Metodo BindEventos
	HIDDEN PROCEDURE BindeoEventos()
		BindEvent(This.OparentForm.Boton, "Click", This, "BotonClick", 0)
		* que se va a usar, evento, desde donde, evento, y que metodo usar primer
	ENDPROC
	
	*Metodo BotonClick
	PROCEDURE BotonClick()
		WAIT Windows "Click desde el controlador"
	ENDPROC

	*
ENDDEFINE

DEFINE Class Fomulario as Form
	Height = 500
	Width = 500
	Visible = .T.

	*Metodo Constructor
	Hidden Procedure Init()
		This.AñadirBoton
		This.Show
	EndProc


	*Metodo AñadirBoton
	Procedure AñadirBoton
		This.AddObject("Boton", "Boton", This)
	ENDPROC
ENDDEFINE


DEFINE Class Boton As CommandButton
	* Atributo OparentForm
	Protected OparentForm

	Height = 50
	Visible = .T.
	Width = 50

	* Metodo Constructor
	Hidden Procedure Init(Formulario As Form)
		This.SetParentForm(Fomulario)
		This.AutoPlace()
	EndProc

	* Metodo SetParentForm
	Hidden Procedure SetParentForm(Formulario As Form)
		This.OparentForm = Formulario

	EndProc


ENDDEFINE