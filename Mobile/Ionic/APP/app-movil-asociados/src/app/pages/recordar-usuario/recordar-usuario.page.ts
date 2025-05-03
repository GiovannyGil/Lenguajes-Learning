import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recordar-usuario',
  templateUrl: './recordar-usuario.page.html',
  styleUrls: ['./recordar-usuario.page.scss'],
})
export class RecordarUsuarioPage implements OnInit {
  qrData = {
    CodigoAcceso: null,
    Cedula: '',
    Celular: ''
  };
  AutLogin = {}

  createdCode = null;
  scannedCode = null;
  tipoDocumento = null
  Usuario = null
  Fecha = null


  myForm: FormGroup;
  items = [];
  boton1
  cancelar
  codigoIngreso
  respuestaCodigo
  mensajeCodigo: any

  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl:AlertController
  ) {
    this.myForm = this.fb.group({
      Cedula: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Celular: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.minLength(1), Validators.maxLength(10)]],
    })
    this.codigoIngreso = null;
    this.respuestaCodigo = null
  }

  ngOnInit() {
  }

  /*Auth ==> Función que realiza la validación de la cédula y el usuario */
  RecordarUsuario() {
    this.AutLogin = {
      cedula: CryptoJS.AES.encrypt(this.qrData.Cedula, this.Constants._secret).toString(),
      celular: CryptoJS.AES.encrypt(this.qrData.Celular.toString(), this.Constants._secret).toString()
    }

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIRecordarUsuario, this.AutLogin).subscribe(res => {
    this.NitsServices.CargandoDismiss()

      this.NitsServices.mostrarMensajes(res)
      if(res[0][0].codigo!=undefined){
        this.respuestaCodigo = res[0][0].codigo.replace(/ /g, "")
      }else{ this.respuestaCodigo="000"}

      if(this.respuestaCodigo=='855'){
        return
      }
  else{
        this.NitsServices.LogIn()
        return
     }
    },
      error => {
        this.NitsServices.CargandoDismiss()
        this.NitsServices.AlertMsm("Error de conexión con el servidor")
        console.log(JSON.stringify(error));
      });
  }

}
