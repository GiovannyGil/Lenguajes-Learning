import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confirmar-login',
  templateUrl: './confirmar-login.page.html',
  styleUrls: ['./confirmar-login.page.scss'],
})
export class ConfirmarLoginPage implements OnInit {
  myForm: FormGroup;
  mensajeCodigo: any
  codigo
  CodigoSeguridad
  Clave
  isCode
  codigoIngreso
  respuestaCodigo
  paramettersCodigoRecuperaClave={}
  AutLogin = {
    operador: null,
    PassWord: null,
    codigo: null,
    esoperador: null
  }
  imgyfrase
  check: boolean

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController
  ) {
    this.imgyfrase=this.router.getCurrentNavigation().extras.queryParams.data;
    this.isCode=this.router.getCurrentNavigation().extras.queryParams.isCode;
    if(this.isCode==true){
      this.myForm = this.fb.group({
        CodigoSeguridad: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(1)]],
        Clave: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*'), Validators.minLength(1)]],
        Check: ['']
      })
    }else{
        this.myForm = this.fb.group({
          Clave: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*'), Validators.minLength(1)]],
          Check: ['']
        })
    }
   }

  ngOnInit() {
    //debugger
    var mensajeinicio = CryptoJS.AES.decrypt(
      this.imgyfrase.mensajeinicio,
     this.Constants._secret
    );
    this.imgyfrase.mensajeinicio= CryptoJS.enc.Utf8.stringify(mensajeinicio);

    var urlimagen = CryptoJS.AES.decrypt(
      this.imgyfrase.url,
     this.Constants._secret
    );
    this.imgyfrase.url= CryptoJS.enc.Utf8.stringify(urlimagen);
  }

  LogIn() {
    if(this.check==undefined || !this.check){
      this.NitsServices.AlertMsm("Debe confirmar su imagen y frase registrada");
      return
    }
    this.AutLogin = {
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      PassWord: CryptoJS.AES.encrypt(this.Clave, this.Constants._secret).toString(),
      codigo: CryptoJS.AES.encrypt((!this.CodigoSeguridad? "": this.CodigoSeguridad), this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador")
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APILogin, this.AutLogin).subscribe(res => {
    this.NitsServices.CargandoDismiss()
       //desencripto datos


    //    var Mensaje = CryptoJS.AES.decrypt(
    //     res[0][0].Mensaje,
    //     this.Constants._secret
    // );
    // res[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(Mensaje);

    var Codigo = CryptoJS.AES.decrypt(
      res[0][0].Codigo,
      this.Constants._secret
    );
    res[0][0].Codigo = CryptoJS.enc.Utf8.stringify(Codigo);


   if(res[0][0].esoperador!=undefined){
      var codigopreguntas = CryptoJS.AES.decrypt(
        res[0][0].codigopreguntas,
        this.Constants._secret
      );
      res[0][0].codigopreguntas = CryptoJS.enc.Utf8.stringify(codigopreguntas);

      var nombreasociado = CryptoJS.AES.decrypt(
        res[0][0].nombreusuario,
        this.Constants._secret
      );
      res[0][0].nombreusuario = CryptoJS.enc.Utf8.stringify(nombreasociado);

      if (res[0][0].id) {
        var id = CryptoJS.AES.decrypt(
          res[0][0].id,
          this.Constants._secret
        );

        res[0][0].id = CryptoJS.enc.Utf8.stringify(id);
      }
   }

      localStorage.setItem("Auth", res[0][0].token)
      localStorage.setItem("ps", CryptoJS.AES.encrypt(this.Clave, this.Constants._secret).toString())
      this.NitsServices.mostrarMensajes(res)
      if(res[0][0].Codigo) this.codigo = res[0][0].Codigo.replace(/ /g, "")

      // if (this.codigo != '000') {
      //   localStorage.removeItem("esoperador");
      //   localStorage.removeItem("operador");
      //   //this.AlertMsm(res[0][0].Mensaje)
      //   this.LogInBefore()
      //   return
      // }
      if(res[0][0].tipoMensaje === null){
        localStorage.setItem("id", res[0][0].id)
        localStorage.setItem("nombreUsuario", res[0][0].nombreusuario)
        localStorage.setItem("ultimoIngresoAsociado", res[0][0].ultimoingreso)

        if(res[0][0].codigopreguntas === "124"){
           this.router.navigateByUrl('/preguntas-seguridad')
        }else
        {
          this.router.navigateByUrl('/publicidad');//se llama a la pagina del menu porque en el componente esta el rootPage al Home
        }
      }else if( this.codigo=="819"){
        let navigationExtras: NavigationExtras = {
          queryParams: {dedondeviene:'confirmarlogin'},
        };
        this.router.navigateByUrl('/respuestas-seguridad', navigationExtras)
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //Recuperacion de clave
  async RecuperarClave() {
    const alert = await this.alerCtrl.create({
      message: '¿Desea Recuperar la clave?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {

          }
        }, {
          text: 'ACEPTAR',
          handler: () => {
            this.validacionrecuperacion("Genera")
          }
        }
      ]
    });
    await alert.present();
  }

  validacionrecuperacion(parametter){
    this.paramettersCodigoRecuperaClave = {
      Tipo: parametter,
      Operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      codigo: CryptoJS.AES.encrypt(this.codigoIngreso, this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador")
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIValidacionesRecuperacion, this.paramettersCodigoRecuperaClave).subscribe(resp => {
    this.NitsServices.CargandoDismiss()
      //desencripto datos

      this.respuestaCodigo = resp[0][0].Codigo.replace(/ /g, "")

      if (this.respuestaCodigo == "128") {
        var Mensaje = CryptoJS.AES.decrypt(
          resp[0][0].Mensaje,
          this.Constants._secret
      );
      resp[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(Mensaje);

        this.AlertMsmcodigo(resp[0][0].Mensaje, true);
      }else if(this.respuestaCodigo == "132"){
        this.router.navigateByUrl('/recuperacion-clave')
      }else if(this.respuestaCodigo == "131" && resp[0][0].preguntasclaveprincipal=="S"){
        let navigationExtras: NavigationExtras = {
          queryParams: {dedondeviene:'confirmarlogin'},
        };

        this.router.navigateByUrl('/respuestas-seguridad', navigationExtras)
      }else if(this.respuestaCodigo == "131" && resp[0][0].preguntasclaveprincipal=="N"){
        this.router.navigateByUrl('/recuperacion-clave')
      }
      else
      {
        this.NitsServices.mostrarMensajes(resp)
      }
    }, err => {
      console.log(err)
    });
    }

    //Muestra alerta con mensaje y pedirCodigo en true si se requiere de codigo de verificacion
    async AlertMsmcodigo(Message, pedirCodigo) {
      const alert = await this.alerCtrl.create({
        header: 'Notificación',
        message: Message,
        buttons: ['OK'],
        cssClass: 'color:#fff'
      });
      await alert.present();
      await alert.onDidDismiss();
      if (pedirCodigo) {
        this.VerificarCodigo()
      }
    }

    //Solicita y verifica el cdigo
    async VerificarCodigo() {
      const alert = await this.alerCtrl.create({
        header: 'Código de verificación',
        inputs: [
          {
            name: 'codigo',
            placeholder: 'Código'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {

            }
          }, {
            text: 'OK',
            handler: (data) => {
              this.codigoIngreso = data.codigo.replace(/ /g, "")
              if ( this.codigoIngreso) {
                this.validacionrecuperacion("Valida");
              }
            }
          }
        ]
      });
      await alert.present();
    }

}
