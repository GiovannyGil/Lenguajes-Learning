import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {AuthService} from '../../servicios/auth.service';
import {NitsService} from '../../servicios/nits.service'

@Component({
  selector: 'app-recuperacion-clave',
  templateUrl: './recuperacion-clave.page.html',
  styleUrls: ['./recuperacion-clave.page.scss'],
})
export class RecuperacionClavePage implements OnInit {
  myForm: FormGroup;
  qrData = {
    CodigoAcceso: null,
    Clave1: '',
    Clave2: ''
  };
  AutLogin = {}
  codigoIngreso
  respuestaCodigo

  constructor(public fb: FormBuilder,
    private Constants: ConstantsService,
    private authService: AuthService,
    public  NitsServices: NitsService,) {
    this.myForm = this.fb.group({
      Clave1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.maxLength(20)]],
      Clave2: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.maxLength(20)]],
    })
    this.codigoIngreso = null;
    this.respuestaCodigo = null
   }

  ngOnInit() {
  }

  RecuperarClave() {
    this.AutLogin = {
      USUARIO: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      CLAVE: CryptoJS.AES.encrypt(this.qrData.Clave1, this.Constants._secret).toString()
    }

    if(this.qrData.Clave1 !== this.qrData.Clave2){
      this.NitsServices.AlertMsm("Las contraseñas no coinciden ... Verifique por favor")
      return
    }

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIRecuperaClave, this.AutLogin).subscribe(res => {
    this.NitsServices.CargandoDismiss()

      this.NitsServices.mostrarMensajes(res)
      if(res[0][0].Codigo!=undefined){ this.respuestaCodigo = res[0][0].Codigo.replace(/ /g, "")}

      if(this.respuestaCodigo=="133"){
        localStorage.clear();
        this.NitsServices.LogIn();
        return
      }
    },
      error => {
        this.NitsServices.CargandoDismiss()
        console.log(JSON.stringify(error));
      });
  }

}
