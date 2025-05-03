import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-segunda-clave',
  templateUrl: './segunda-clave.page.html',
  styleUrls: ['./segunda-clave.page.scss'],
})
export class SegundaClavePage implements OnInit {
  myForm: FormGroup;
  qrData = {
    CodigoAcceso: null,
    Clave1: '',
    Clave2: ''
  };
  AutLogin = {}

  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController
  ) { 
    this.myForm = this.fb.group({
      Clave1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*')]],
      Clave2: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*')]],
    })
  }

  ngOnInit() {
  }

  SegundaClave() {
    this.AutLogin = {
      usuario: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      clavenueva: CryptoJS.AES.encrypt(this.qrData.Clave1, this.Constants._secret).toString()
    }

    if(this.qrData.Clave1 !== this.qrData.Clave2){
      this.NitsServices.AlertMsm("Las contraseñas no coinciden ... Verifique por favor")
      return
    }

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISegundaClave, this.AutLogin).subscribe(res => {
    this.NitsServices.CargandoDismiss() 
 
      this.NitsServices.mostrarMensajes(res)
      //if(res[0][0].Codigo!=undefined){ this.respuestaCodigo = res[0][0].Codigo.replace(/ /g, "")}

      // if(this.respuestaCodigo=="133"){
      //   localStorage.clear();
      //   this.LogIn();
      //   return
      // }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

}
