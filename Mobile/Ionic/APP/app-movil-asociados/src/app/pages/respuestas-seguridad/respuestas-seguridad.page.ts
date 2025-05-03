import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-respuestas-seguridad',
  templateUrl: './respuestas-seguridad.page.html',
  styleUrls: ['./respuestas-seguridad.page.scss'],
})
export class RespuestasSeguridadPage implements OnInit {
  myForm: FormGroup;
  parametters = {}
  preguntas: {}
  respuestas: {}
  idpregunta
  idpregunta1
  idpregunta2
  respuesta
  respuesta1
  respuesta2
  preguntaselected
  preguntaselected1
  preguntaselected2
  dedondeviene

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
    this.dedondeviene=this.router.getCurrentNavigation().extras.queryParams.dedondeviene
    //this.dedondeviene='confirmarlogin'
  }

  ngOnInit() {
    this.parametters ={
      operador:  CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador"),
      xml: CryptoJS.AES.encrypt("<root><parameters><Tipo>CONPRE</Tipo></parameters></root>", this.Constants._secret).toString()
    }

    this.authService.ApiSendData(this.Constants._APIPreguntasSeguridad, this.parametters).subscribe(data => { 
    
      if(data[0].length !== 0){
        this.preguntaselected=data[0][0].pregunta
        this.preguntaselected1=data[0][1].pregunta
        this.preguntaselected2=data[0][2].pregunta
        this.idpregunta=data[0][0].idregistro
        this.idpregunta1=data[0][1].idregistro
        this.idpregunta2=data[0][2].idregistro
      }else{
        this.NitsServices.AlertMsm("Usted no ha registrado las preguntas de seguridad por favor hable con su Administrador")
        localStorage.clear();
        this.NitsServices.LogIn();
        return
      }
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
       "<Tipo>CONRES</Tipo>"+
       "<pregunta>"+this.idpregunta+"</pregunta><respuesta>"+this.respuesta+"</respuesta>"+
       "<pregunta1>"+this.idpregunta1+"</pregunta1><respuesta1>"+this.respuesta1+"</respuesta1>"+
       "<pregunta2>"+this.idpregunta2+"</pregunta2><respuesta2>"+this.respuesta2+"</respuesta2>"+
       "</parameters></root>", this.Constants._secret).toString()
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
 
         if(data[0][0].Codigo == 125){
           if(this.dedondeviene=='confirmarlogin'){
           this.router.navigateByUrl('/recuperacion-clave')
           }
           if(this.dedondeviene=='segundaclave'){
            this.router.navigateByUrl('/segunda-clave')
           }
         }
           },
           err => {
             console.log(err)
            }
         )
 
   }
}
