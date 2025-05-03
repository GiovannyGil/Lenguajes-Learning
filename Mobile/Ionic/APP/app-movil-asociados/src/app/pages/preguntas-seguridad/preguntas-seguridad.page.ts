import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-preguntas-seguridad',
  templateUrl: './preguntas-seguridad.page.html',
  styleUrls: ['./preguntas-seguridad.page.scss'],
})
export class PreguntasSeguridadPage implements OnInit {
  myForm: FormGroup;
  parametters = {}
  preguntas: [{idregistro: string; pregunta: string}]
  respuestas: {}
  respuesta
  respuesta1
  respuesta2
  preguntaselected
  preguntaselected1
  preguntaselected2

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController
  ) {
    this.myForm = this.fb.group({
      preguntaselected: ['', [Validators.required]],
      respuesta: ['', [Validators.required]],
      preguntaselected1: ['', [Validators.required]],
      respuesta1: ['', [Validators.required ]],
      preguntaselected2: ['', [Validators.required]],
      respuesta2: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.parametters ={
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador"),
      xml: CryptoJS.AES.encrypt("<root><parameters><Tipo>CONSUL</Tipo></parameters></root>", this.Constants._secret).toString()
    }

    this.authService.ApiSendData(this.Constants._APIPreguntasSeguridad, this.parametters).subscribe(data => {
      this.preguntas = data[0]
       },
       err => {
         console.log(err)
        }
     )
  }

  async Confirmar() {
    const alert = await this.alerCtrl.create({
      message: '¿Esta seguro de guardar las respuestas?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {

          }
        }, {
          text: 'ACEPTAR',
          handler: () => {
            this.GuardarRespuestas()
          }
        }
      ]
    });
    await alert.present();
  }

  GuardarRespuestas(){
    this.respuestas = {
    operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
   esoperador: localStorage.getItem("esoperador"),
       xml: CryptoJS.AES.encrypt("<root><parameters>"+
       "<Tipo>INSERT</Tipo>"+
       "<pregunta>"+this.preguntaselected+"</pregunta><respuesta>"+this.respuesta+"</respuesta>"+
       "<pregunta1>"+this.preguntaselected1+"</pregunta1><respuesta1>"+this.respuesta1+"</respuesta1>"+
       "<pregunta2>"+this.preguntaselected2+"</pregunta2><respuesta2>"+this.respuesta2+"</respuesta2>"+
       "</parameters></root>",this.Constants._secret).toString()
     }

     if(this.preguntaselected===this.preguntaselected1 ||
        this.preguntaselected===this.preguntaselected2 ||
        this.preguntaselected1==this.preguntaselected2)
       {
        this.NitsServices.AlertMsm("Las preguntas no pueden ser repetidas")
        return
       }

       this.NitsServices.Cargando()
       this.authService.ApiSendData(this.Constants._APIPreguntasSeguridad, this.respuestas).subscribe(data => {
       this.NitsServices.CargandoDismiss()

         this.NitsServices.mostrarMensajes(data)
         if(data[0][0].Codigo !== 122){
           this.NitsServices.LogIn()
           return
         }else{
          this.router.navigateByUrl('/publicidad')
         }
         console.log(data)
           },
           err => {
            this.NitsServices.CargandoDismiss()
             console.log(err)
            }
         )

   }

}
