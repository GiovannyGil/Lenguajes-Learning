import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../../servicios/constants.service';
import {AuthService} from '../../servicios/auth.service';
import {NitsService} from '../../servicios/nits.service'
import * as CryptoJS from 'crypto-js'
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.page.html',
  styleUrls: ['./portafolio.page.scss'],
})
export class PortafolioPage implements OnInit {
portafolio: any
numeroentidad=localStorage.getItem("numeroentidad")
clave
identifica
respuestaCodigo

  constructor(
    private Constants: ConstantsService,
    private authService: AuthService,
    public  NitsServices: NitsService,
    public router: Router,
    public alerCtrl:AlertController
  ) { }

  ngOnInit() {
    this.authService.ApiSendData(this.Constants._APIPublicidad, {esoperador:"N"}).subscribe(data => {
      this.portafolio=data[3]

    },
         err => {
           console.log(err)
          })
  }

   //Solicita y verifica la clave con la que se ingresa a la app
   async VerificarIngreso(item) {
    const alert = await this.alerCtrl.create({
      header: 'Por seguridad ingrese sus datos',
      inputs: [
        {
          name: 'identificacion',
          placeholder: 'Identificación'
        },
        {
          name: 'clave',
          placeholder: 'Clave',
          type: 'password'
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
            if(data.identificacion=="" || data.clave==""){
              this.AlertEmpty("Debe diligenciar todos los campos")
              return
            }

              if(data.identificacion!="" && data.clave!=""){
              this.identifica = data.identificacion.replace(/ /g, "")
              this.clave      = data.clave.replace(/ /g, "")
                  this.Validar(item);
             }
          }
        }
      ]
    });
    await alert.present();
  }

  Validar(item) {
    var Login = {
      usuario: CryptoJS.AES.encrypt(this.identifica, this.Constants._secret).toString(),
      clave: CryptoJS.AES.encrypt(this.clave, this.Constants._secret).toString(),
    }

    this.authService.ApiSendData(this.Constants._APIvalidar, Login).subscribe(res => {
        var codigo = CryptoJS.AES.decrypt(
            res[0][0].Codigo,
            this.Constants._secret
        );
           res[0][0].Codigo = CryptoJS.enc.Utf8.stringify(codigo);
        var mensaje = CryptoJS.AES.decrypt(
          res[0][0].Mensaje,
          this.Constants._secret
        );
           res[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(mensaje);


      localStorage.setItem("Auth", res[0][0].token)//se llena el token para que no saque error cuando vaya al api

      this.respuestaCodigo = res[0][0].Codigo.replace(/ /g, "")

      if(this.respuestaCodigo === '000'){
        const navigationExtras: NavigationExtras = {
          queryParams: {id:item.idregistro, descripcion: item.Descripcion, cedula: this.identifica, Mensaje: res[0][0].Mensaje}
        }

        this.router.navigateByUrl('/creacion-ahorros-fecsa', navigationExtras)
      }else {
        this.NitsServices.AlertMsm(res[0][0].Mensaje)
        localStorage.clear()
        this.NitsServices.LogIn()
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  async AlertEmpty(Message) {
    const alert = await this.alerCtrl.create({
      header: 'Notificación',
      message: Message,
      buttons: [{
          text: 'OK',
          handler: () => {
            this.VerificarIngreso("")
          }
        }]
    });
    await alert.present();
  }

}
