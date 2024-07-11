SET PROCEDURE TO controlador ADDITIVE
SET PROCEDURE TO grupos ADDITIVE
SET PROCEDURE TO Dependencias ADDITIVE
SET PROCEDURE TO TareaDTO ADDITIVE
SET PROCEDURE TO Tareas ADDITIVE

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
        *!*	 this.LeerTarea()
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

        * Leer
        THIS.AddObject("btnLeer", "CommandButton")
        WITH This.btnLeer
            .Caption = "Leer"
            .Top = 240
            .Left = 320
            .Width = 60
            .Height = 30
            .Visible = .T.
        ENDWITH

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

        * Limpiar
        THIS.AddObject("btnLimpiar", "CommandButton")
        WITH This.btnLimpiar
            .Caption = "Limpiar"
            .Top = 190
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
            .Top = 240
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
            
            * Llamar a la función ListarTareas para obtener los datos
            *!*	 Thisform.ListarTareas()
            This.ListarTareas()
                        
            * Enlazar el cursor al grid
            .RecordSource = "curTareas" && 
            .RecordSourceType = 2  && 2 indica que RecordSource es un alias de tabla
            
            * Mover el cursor al primer registro
            GO TOP IN curTareas
            
            * Refrescar el grid para asegurarse de que todos los registros se muestren
            .Refresh()
            
            * Configurar las columnas del grid
            .Column1.Header1.Caption = "ID"
            .Column1.Width = 30
            .Column1.Visible = .T.
            .Column1.ReadOnly = .T.

            .Column2.Header1.Caption = "Nombre"
            .Column2.Width = 70
            .Column2.Visible = .T.
            .Column2.ReadOnly = .T.

            .Column3.Header1.Caption = "Grupo"
            .Column3.Width = 80
            .Column3.Visible = .T.
            .Column3.ReadOnly = .T.

            .Column4.Header1.Caption = "Dependencia"
            .Column5.Width = 90
            .Column4.Visible = .T.
            .Column4.ReadOnly = .T.

            .Column5.Header1.Caption = "Descripción"
            .Column5.Width = 120
            .Column5.Visible = .T.
            .Column5.ReadOnly = .T.
        ENDWITH
        
    ENDPROC
    
    
	*!*	 -----------------------------------------------------------------------
	*!*	 funciones

	*!*	 bindeo de eventos
	HIDDEN PROCEDURE BindeoEventos()
		BindEvent(This.btnGuardar, "Click", This, "Guardar", 0)
		BindEvent(This.btnActualizar, "Click", This, "Actualizar", 0)
		BindEvent(This.btnEliminar, "Click", This, "EliminarTarea", 0)
        BindEvent(This.btnLeer, "Click", This, "LeerTarea", 0)
        BindEvent(This.btnLimpiar, "Click", This, "LimpiarCampos", 0)
	ENDPROC

    PROCEDURE ListarTareas
        * Obtener la colección de tareas del controlador
        LOCAL oControlador, i, oTarea
        oControlador = CREATEOBJECT("Controlador")
        oControlador.CrearColeccionTareas()
            
        * Crear un cursor temporal para enlazar con el grid
        CREATE CURSOR curTareas (IDTarea I, Nombre C(50), Grupo C(50), Dependencia C(50), Descripcion C(100))
            
        * Recorrer la colección de tareas y agregarlas al cursor
        FOR i = 1 TO oControlador.ColeccionTareas.Count
            oTarea = oControlador.ColeccionTareas.Item(i)
            INSERT INTO curTareas (IDTarea, Nombre, Grupo, Dependencia, Descripcion) ;
                VALUES (oTarea.IDTarea, oTarea.Nombre, oTarea.Grupo, oTarea.Dependencia, oTarea.Descripcion)
        ENDFOR


        RETURN oControlador.ColeccionTareas
    ENDPROC

    * Llenar los comboboxes de Grupo y Dependencia
    PROCEDURE LlenarCombos
		LOCAL i
		* Grupo
		FOR i = 1 TO This.Controlador.Grupos.ColectionGrupos.Count
			This.cbxGrupo.AddItem(This.Controlador.Grupos.ColectionGrupos.Item(i))
		ENDFOR
		* poner el primer item por defecto en el combo box
		This.cbxGrupo.Value = This.Controlador.Grupos.ColectionGrupos.Item(1)


		* Dependencia
		FOR i = 1 TO This.Controlador.Dependencias.ColectionDependencias.Count
			This.cbxDependencia.AddItem(This.Controlador.Dependencias.ColectionDependencias.Item(i))
		ENDFOR
		This.cbxDependencia.value = This.Controlador.Dependencias.ColectionDependencias.Item(1)
    ENDPROC

    PROCEDURE LlenarCampos(sIDTarea)
        LOCAL oTarea
    
        * Llamar a la función LeerTarea para obtener la tarea
        oTarea = This.LeerTarea(sIDTarea)
    
        * Verificar si se encontró la tarea
        IF NOT ISNULL(oTarea)
            this.txtNombre.Value = oTarea.Nombre
            this.txtGrupo.Value = oTarea.Grupo
            this.txtDependencia.Value = oTarea.Dependencia
            this.txtDescripcion.Value = oTarea.Descripcion
            RETURN .T.  && Llenado exitoso
        ELSE
            RETURN .F.  && No se encontró la tarea
        ENDIF
    ENDPROC

    PROCEDURE LeerTarea(sIDTarea)
        LOCAL sIDTarea, oTarea
        sIDTarea = VAL(This.txtID.Value)  && Convertir el valor a numérico
        
        * Llamar al método LeerTarea del controlador
        oTarea = This.Controlador.LeerTarea(sIDTarea)
        
        * Llenar los campos del formulario con los datos de la tarea
        IF NOT ISNULL(oTarea)
            This.txtNombre.Value = oTarea.Nombre
            This.cbxGrupo.Value = oTarea.Grupo
            This.cbxDependencia.Value = oTarea.Dependencia
            This.txtDescripcion.Value = oTarea.Descripcion
            WITH Thisform
                .txtID.value=""
            ENDWITH
        ELSE
            MESSAGEBOX("Error: No se encontró la tarea.", 16, "Error")
        ENDIF
    ENDPROC

    * Guardar una nueva tarea
    PROCEDURE Guardar
        LOCAL sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion
        LOCAL oControlador, oColeccionTareas

        * Obtener la colección de tareas
        oControlador = This.Controlador
        oColeccionTareas = oControlador.ColeccionTareas
        
        * validar que la colecion llegue correctamente
        IF VARTYPE(oColeccionTareas) != "O" AND ISNULL(oColeccionTareas)
            MESSAGEBOX("Error: No se pudo obtener la colección de tareas.", 0, "Error")
            RETURN
        ENDIF

        * Obtener los valores de los campos del formulario
        sIDTarea = oColeccionTareas.Count + 1
        sNombre = This.txtNombre.Value
        sGrupo = This.cbxGrupo.Value
        sDependencia = This.cbxDependencia.Value
        sDescripcion = This.txtDescripcion.Value

        * Validar que los campos no estén vacíos
        IF EMPTY(sNombre) OR EMPTY(sNombre) OR EMPTY(sGrupo) OR EMPTY(sDependencia) OR EMPTY(sDescripcion)
            MESSAGEBOX("Por favor complete todos los campos.", 16, "Error")
            RETURN
        ENDIF

        * Agregar la tarea a la colección
        oControlador.AgregarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)

        * Verificar si la tarea se agregó correctamente
        IF oControlador.ColeccionTareas.Count = sIDTarea
            MESSAGEBOX("Tarea agregada correctamente.", 0, "Éxito")
        ELSE
            MESSAGEBOX("Error: La tarea no se agregó a la colección.", 0, "Error")
            RETURN
        ENDIF

        * Limpiar los campos del formulario
        This.LimpiarCampos()

        * Actualizar el grid con la nueva colección de tareas
        This.ActualizarGrid(oControlador)
    ENDPROC
    
    PROCEDURE ActualizarGrid(oControlador)
        LOCAL i, oTarea
    
        * Crear un cursor temporal para enlazar con el grid
        CREATE CURSOR curTareas (IDTarea I, Nombre C(50), Grupo C(50), Dependencia C(50), Descripcion C(100))
            
        * Recorrer la colección de tareas y agregarlas al cursor
        FOR i = 1 TO oControlador.ColeccionTareas.Count
            oTarea = oControlador.ColeccionTareas.Item(i)
            INSERT INTO curTareas (IDTarea, Nombre, Grupo, Dependencia, Descripcion) ;
                VALUES (oTarea.IDTarea, oTarea.Nombre, oTarea.Grupo, oTarea.Dependencia, oTarea.Descripcion)
        ENDFOR
    
        * Enlazar el cursor con el grid
        This.grdTareas.RecordSource = "curTareas"
        SELECT curTareas 
        GO TOP
        This.grdTareas.Refresh()
        
    ENDPROC

    * Actualizar una tarea existente
    PROCEDURE Actualizar
        LOCAL sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion
        LOCAL oControlador
        
        * Obtener el ID de la tarea a actualizar
        sIDTarea = VAL(This.txtID.Value)
        
        * Verificar que el ID no esté vacío
        IF EMPTY(sIDTarea)
            MESSAGEBOX("Por favor ingrese el ID de la tarea a actualizar.", 16, "Error")
            RETURN
        ENDIF
        
        * Obtener los valores de los campos del formulario
        sNombre = This.txtNombre.Value
        sGrupo = This.cbxGrupo.Value
        sDependencia = This.cbxDependencia.Value
        sDescripcion = This.txtDescripcion.Value
        
        * Obtener el controlador
        oControlador = This.Controlador
        
        * Llamar al método ActualizarTarea del controlador
        IF oControlador.ActualizarTarea(sIDTarea, sNombre, sGrupo, sDependencia, sDescripcion)
            MESSAGEBOX("Tarea actualizada correctamente.", 0, "Éxito")
            * Actualizar el grid para reflejar los cambios
            This.ActualizarGrid(oControlador)
        ELSE
            MESSAGEBOX("Error: La tarea no se pudo actualizar.", 16, "Error")
        ENDIF
    ENDPROC


	* Eliminar una tarea por su ID
    PROCEDURE EliminarTarea
        *!*	 LOCAL sIDTarea
        *!*	 sIDTarea = This.txtID.Value
        LOCAL lnIDTarea
        lnIDTarea = VAL(ThisForm.txtID.Value)  && Convertir el valor a numérico


        IF EMPTY(lnIDTarea)
            MESSAGEBOX("Por favor ingrese el ID de la tarea a eliminar.", 16, "Error")
            RETURN
        ENDIF

        * Llamar a EliminarTarea pasando el ID convertido
        IF This.Controlador.EliminarTarea(lnIDTarea)
            MESSAGEBOX("Tarea eliminada correctamente.", 0, "Éxito")
            ThisForm.LimpiarCampos()
            ThisForm.ActualizarGrid(ThisForm.Controlador)  && Actualizar el grid en el formulario
        ELSE
            MESSAGEBOX("Error: La tarea no se pudo eliminar, o no existe", 16, "Error")
        ENDIF
    ENDPROC

	* Limpiar los campos del formulario
    PROCEDURE LimpiarCampos
        WITH Thisform
            .txtNombre.Value = ""
            .txtDescripcion.Value = ""
            .txtID.value=""
			This.LlenarCombos()
        ENDWITH
    ENDPROC


    *Encapzulacion de error
    PROCEDURE Error(nerror as Integer, cmethod as String, nline as Integer)
        MESSAGEBOX("Còdigo Error: " + ALLTRIM(STR(nerror)) + Chr(13) + "Metodo: " + cmethod + CHR(13) + "Linea: " + ALLTRIM(STR(nline)), 64"Visualizaciòn de Errores")
    ENDPROC
		
ENDDEFINE
