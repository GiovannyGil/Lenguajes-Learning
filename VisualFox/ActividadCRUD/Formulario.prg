SET PROCEDURE TO controlador ADDITIVE
SET PROCEDURE TO grupos ADDITIVE
SET PROCEDURE TO Dependencias ADDITIVE
SET PROCEDURE TO TareaDTO ADDITIVE

Local oForm 
oForm = CREATEOBJECT("FormularioCRUD")
oForm.show(1)

DEFINE CLASS FormularioCRUD As Form

	Caption = "Actividad CRUD"
	width = 476
	Height = 450

	PROCEDURE Init()
		*!*	 añadir el controlador
		This.AddObject("Controlador", "Controlador")
        This.Controlador.Init()
        This.Formulario()
        This.GridTareas()
        This.LlenarCombos()
		This.BindeoEventos()
	ENDPROC

	PROCEDURE Formulario as Form

		* Titulo
		This.AddObject("Titulo", "Label")
		WITH thisform.Titulo
			.visible = .T.
			.Caption = "FORMULARIO"
			.left = 130
			.top = 20
			.fontsize = 24
			.width = 300
			.Height = 50
		ENDWITH

		*-------------------------------------------------------------------------------------

		* Crear el label e input Nombre
        THIS.AddObject("lblNombre", "Label")
        WITH This.lblNombre
            .Visible = .T.
            .Top = 100
            .Left = 30
            .Caption = "Nombre:"
        ENDWITH

        THIS.AddObject("txtNombre", "Textbox")
        WITH This.txtNombre
            .Visible = .T.
            .Top = 117
            .Left = 30
            .Width = 100
        ENDWITH

		* ---------------------------------------

    	* Crear el label e input Grupo
        THIS.AddObject("lblGrupo", "Label")
        WITH This.lblGrupo
            .Visible = .T.
            .Top = 100
            .Left = 145
            .Caption = "Grupo:"
        ENDWITH

        THIS.AddObject("cbxGrupo", "ComboBox")
        WITH This.cbxGrupo
            .Visible = .T.
            .Top = 117
            .Left = 145
            .Width = 100
        ENDWITH

		* ---------------------------------------

		* Crear el label e input Dependencia
        THIS.AddObject("lblDependencia", "Label")
        WITH This.lblDependencia
            .Visible = .T.
            .Top = 100
            .Left = 260
            .Caption = "Dependencia:"
        ENDWITH

        THIS.AddObject("cbxDependencia", "ComboBox")
        WITH This.cbxDependencia
            .Visible = .T.
            .Top = 117
            .Left = 260
            .Width = 100
        ENDWITH

		* ---------------------------------------

		* Crear el label e input Descripcion
        THIS.AddObject("lblDescripcion", "Label")
        WITH This.lblDescripcion
            .Visible = .T.
            .Top = 150
            .Left = 30
            .Caption = "Descripcion:"
        ENDWITH

        THIS.AddObject("txtDescripcion", "Textbox")
        WITH This.txtDescripcion
            .Visible = .T.
            .Top = 167
            .Left = 30
            .Width = 330
            .Height = 65
        ENDWITH

		* ---------------------------------------

    	* Crear el label e input IDTarea para la solicitud de leer la tarea
        THIS.AddObject("lblID", "Label")
        WITH This.lblID
            .Visible = .T.
            .Top = 248
            .Left = 30
            .Caption = "ID:"
            .Width = 50
        ENDWITH

        THIS.AddObject("txtID", "Textbox")
        WITH This.txtID
            .Visible = .T.
            .Top = 245
            .Left = 50
            .Width = 40
        ENDWITH

    	*-------------------------------------------------------------------------------------


    	* Botones

		* ---------------------------------------
        * Guardar
        THIS.AddObject("btnGuardar", "CommandButton")
        WITH This.btnGuardar
            .Caption = "Guardar"
            .Top = 120
            .Left = 390
            .Width = 60
            .Height = 30
            .Visible = .T.
        ENDWITH

		* ---------------------------------------

        * Leer
        THIS.AddObject("btnLeer", "CommandButton")
        WITH This.btnLeer
            .Caption = "Leer"
            .Top = 240
            .Left = 390
            .Width = 60
            .Height = 30
            .Visible = .T.
        ENDWITH

		* ---------------------------------------

        * Actualizar
        THIS.AddObject("btnActualizar", "CommandButton")
        WITH This.btnActualizar
            .Caption = "Actualizar"
            .Top = 155
            .Left = 390
            .Width = 60
            .Height = 30
            .Visible = .T.            
        ENDWITH
 
		* ---------------------------------------

        * Eliminar
        THIS.AddObject("btnEliminar", "CommandButton")
        WITH This.btnEliminar
            .Caption = "Eliminar"
            .Top = 190
            .Left = 390
            .Width = 60
            .Height = 30
            .Visible = .T.
        ENDWITH

		* ---------------------------------------
		
    	* Linea divisora
    	This.AddObject("LineaDivisora", "Shape")
    	WITH thisform.LineaDivisora
    		.top = 235
    		.visible = .T.
    		.BackStyle = 1
    		.BorderWidth = 1
    		.Width = 419
    		.Height = 1
    		.Visible = .T.
    		.Left = 30
    	ENDWITH

	ENDPROC
	
	*-------------------------------------------------------------------------------------
	   
    * Actualizar el grid con las tareas
    PROCEDURE GridTareas
        THIS.AddObject("grdTareas", "Grid")
        WITH This.grdTareas
            .Left = 30
            .Top = 275
            .Width = 418
            .Height = 164
            .Visible = .T.
            .ColumnCount = 5
            .Column1.Header1.Caption = "ID"
			.Column1.Width = 30
            .Column2.Header1.Caption = "Nombre"
            .Column3.Header1.Caption = "Grupo"
            .Column4.Header1.Caption = "Dependencia"
            .Column5.Header1.Caption = "Descripción"
			.Column5.Width = 120
        ENDWITH
    ENDPROC

	*!*	 -----------------------------------------------------------------------
	*!*	 funciones


	*!*	 bindeo de eventos
	HIDDEN PROCEDURE BindeoEventos()
		*!*	 actualizar
		BindEvent(This.btnGuardar, "Click", This, "Guardar", 0)
		BindEvent(This.btnActualizar, "Click", This, "Actualizar", 0)
		BindEvent(This.btnEliminar, "Click", This, "Eliminar", 0)

	ENDPROC

    * Llenar los comboboxes de Grupo y Dependencia
    PROCEDURE LlenarCombos
		LOCAL i
		* Grupo
		FOR i = 1 TO This.Controlador.Grupos.ColectionGrupos.Count
			This.cbxGrupo.AddItem(This.Controlador.Grupos.ColectionGrupos.Item(i))
		NEXT
		* poner el primer item por defecto en el combo box
		This.cbxGrupo.Value = This.Controlador.Grupos.ColectionGrupos.Item(1)


		* Dependencia
		FOR i = 1 TO This.Controlador.Dependencias.ColectionDependencias.Count
			This.cbxDependencia.AddItem(This.Controlador.Dependencias.ColectionDependencias.Item(i))
		NEXT
		This.cbxDependencia.value = This.Controlador.Dependencias.ColectionDependencias.Item(1)
    ENDPROC

	* Guardar una nueva tarea
    PROCEDURE Guardar
		IF This.LimpiarCampos() THEN 
			MESSAGEBOX("No se puede Guardar, no hay Datos", 0, "Aviso")
		ELSE
			* Lógica para actualizar la tarea
			MESSAGEBOX("Se Guardo exitosamente", 0, "Aviso")
		ENDIF
    ENDPROC

	* Leer una tarea por su ID
    PROCEDURE Leer

    ENDP	ROC

	* Actualizar una tarea existente
    PROCEDURE Actualizar
		IF This.LimpiarCampos() THEN 
			MESSAGEBOX("No se puede Actualizar", 0, "Aviso")
		ELSE
			* Lógica para actualizar la tarea
			MESSAGEBOX("Actualización exitosa", 0, "Aviso")
		ENDIF
    ENDPROC

	* Eliminar una tarea por su ID
    PROCEDURE Eliminar
		IF This.LimpiarCampos() THEN 
			MESSAGEBOX("No se puede Eliminar", 0, "Aviso")
		ELSE
			* Lógica para actualizar la tarea
			MESSAGEBOX("Eliminacion exitosa", 0, "Aviso")
		ENDIF
    ENDPROC

	* Limpiar los campos del formulario
    PROCEDURE LimpiarCampos
        WITH Thisform
            * .txtID.Value = ""
            .txtNombre.Value = ""
            *!*	 .cbxGrupo.Value = ""
            *!*	 .cbxDependencia.Value = ""
            .txtDescripcion.Value = ""
			This.LlenarCombos()
        ENDWITH
    ENDPROC


	PROCEDURE Err_Handler(oError)
		LOCAL lcErrorMsg
		lcErrorMsg = "Error #" + TRANSFORM(oError.ErrorNo) + CHR(13) + ;
					"Message: " + oError.Message + CHR(13) + ;
					"Line: " + TRANSFORM(oError.LineNo) + CHR(13) + ;
					"Details: " + oError.Details + CHR(13) + ;
					"Program: " + oError.Program + CHR(13) + ;
					"Method: " + oError.Method
	
		MESSAGEBOX(lcErrorMsg, 16, "Error")
	ENDPROC
		
ENDDEFINE
