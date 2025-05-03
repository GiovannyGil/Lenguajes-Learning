import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  qrData = {
    CodigoAcceso: null,
    Usuario: '',
    Clave1: '',
    Clave2: '',
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
      Usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(8), Validators.maxLength(15)]],
      Clave1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*'), Validators.minLength(4), Validators.maxLength(6)]],
      Clave2: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.minLength(4), Validators.maxLength(6)]],
      Celular: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.minLength(1), Validators.maxLength(10)]],
    })
    this.codigoIngreso = null;
    this.respuestaCodigo = null
  }

  ngOnInit() {
  }

   /*Auth ==> Función que realiza la validación de la cédula y el usuario */
   NuevoUsuario() {
    console.log(this.AutLogin)
    this.AutLogin = {
      nuevousuario: CryptoJS.AES.encrypt(this.qrData.Usuario, this.Constants._secret).toString(),
      cedula: CryptoJS.AES.encrypt(this.qrData.Cedula, this.Constants._secret).toString(),
      contrasena: CryptoJS.AES.encrypt(this.qrData.Clave1.toString(), this.Constants._secret).toString(),
      celular: CryptoJS.AES.encrypt(this.qrData.Celular.toString(), this.Constants._secret).toString(),
      codigo: '',
    }
// debugger
    if(this.qrData.Clave1 !== this.qrData.Clave2){
      this.AlertMsm("Las contraseñas no coinciden ... Verifique por favor", false)
      return
    }

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIIngresarNuevoUsuario, this.AutLogin).subscribe(res => {
    this.NitsServices.CargandoDismiss()

      if(res[0][0].codigo.replace(/ /g, "") == 'GEN'){
        var Mensaje = CryptoJS.AES.decrypt(
          res[0][0].Mensaje,
          this.Constants._secret
        );
        res[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(Mensaje);
        this.AlertMsm(res[0][0].Mensaje, true)
        return
     }
      if(res[0][0].codigo.replace(/ /g, "")=='855'){
        this.AlertMsm("Su número de celular no coincide con la base de datos. Comuníquese con su Entidad", false)
        return
      }else{
        this.NitsServices.mostrarMensajes(res)

     }
    },
      error => {
        alert("Error de conexión con el servidor")
        console.log(JSON.stringify(error));
      });
  }

  /*AlertMsm ==> Función que muestra alerta con mensaje de error */
  async AlertMsm(Message, pedirCodigo) {
    const alert = await this.alerCtrl.create({
      subHeader: "Notificación",
      message: Message,
      buttons: ["OK"]
    });

    await alert.present();
    await alert.onDidDismiss()
      if (pedirCodigo) {
        this.VerificarCodigo()
      }
  }

  /*AlertMsm ==> Función que captura el codigo de accedo para su verificacoin */
  async VerificarCodigo() {
    this.mensajeCodigo = await this.alerCtrl.create({
      subHeader: 'Código de verificación',
      inputs: [
        {
          name: 'codigo',
          placeholder: 'Código'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log("Acción cancelada");
            //this.codigoIngreso = 'XXX'
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log(this.codigoIngreso)
            this.codigoIngreso = data.codigo.replace(/ /g, "")
            if ( this.codigoIngreso) {
              this.SendDataUser();
            }
          }
        }
      ]
    });
    await this.mensajeCodigo.present();
  }




  /*AlertMsm ==> Función que envía la informacion para la creación del nuevo usuario */
  SendDataUser() {
    if (this.codigoIngreso != null || this.codigoIngreso.replace(/ /g, "") != "") {
      this.AutLogin = {
      nuevousuario: CryptoJS.AES.encrypt(this.qrData.Usuario, this.Constants._secret).toString(),
      cedula: CryptoJS.AES.encrypt(this.qrData.Cedula, this.Constants._secret).toString(),
      contrasena: CryptoJS.AES.encrypt(this.qrData.Clave1.toString(), this.Constants._secret).toString(),
      celular: CryptoJS.AES.encrypt(this.qrData.Celular.toString(), this.Constants._secret).toString(),
      codigo: CryptoJS.AES.encrypt(this.codigoIngreso, this.Constants._secret).toString()
      }

      this.NitsServices.Cargando()
      this.authService.ApiSendData(this.Constants._APIIngresarNuevoUsuario, this.AutLogin).subscribe(resp => {
      this.NitsServices.CargandoDismiss()
        var Mensaje = CryptoJS.AES.decrypt(
          resp[0][0].Mensaje,
          this.Constants._secret
        );
        resp[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(Mensaje);

        this.respuestaCodigo = resp[0][0].codigo.replace(/ /g, "")

        if (this.respuestaCodigo != "025") {
          this.AlertMsm(resp[0][0].Mensaje, true)
        }else
        {
        this.AlertMsm(resp[0][0].Mensaje, false)
        this.NitsServices.LogIn()
        }
      }, err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
    } else {
      this.AlertMsm("Código no válido, por favor vuelva a realizar el proceso de ingreso", false)
    }
  }

}
