import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.page.html',
  styleUrls: ['./cambio-clave.page.scss'],
})
export class CambioClavePage implements OnInit {
  myForm: FormGroup;
  qrData = {
    Clave: '',
    Clave1: '',
    Clave2: ''
  };

  parametters = {}
  codigoIngreso
  respuestaCodigo
  mensajeCodigo: any

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.myForm = this.fb.group({
      Clave: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.maxLength(20)]],
      Clave1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.maxLength(20)]],
      Clave2: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9/*+.-]*]*'), Validators.maxLength(20)]],
    })
    this.codigoIngreso = null;
    this.respuestaCodigo = null
  }

  ngOnInit() {
  }

  CambioClave() {
    this.parametters = {
      usuario: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      clavenueva: CryptoJS.AES.encrypt(this.qrData.Clave1, this.Constants._secret).toString(),
      claveanterior: CryptoJS.AES.encrypt(this.qrData.Clave, this.Constants._secret).toString(),
      NumeroError: '000',
      MensajeError: "",
      Tipoerror:""
    }
    //cedula = CryptoJS.AES.encrypt(cedula, secret).toString()

    if(this.qrData.Clave1 !== this.qrData.Clave2){
      this.NitsServices.AlertMsm("Las contraseñas no coinciden... Verifique por favor")
      return
    }

    if(this.qrData.Clave === this.qrData.Clave2){
      this.NitsServices.AlertMsm("La nueva contraseña y la anterior son la misma... Verifique por favor")
      return
    }

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APICambioClave, this.parametters).subscribe(res => {
    this.NitsServices.CargandoDismiss()

      this.NitsServices.mostrarMensajes(res)
      if(res[0][0].codigo!=undefined){ this.respuestaCodigo = res[0][0].codigo.replace(/ /g, "")}

      if(this.respuestaCodigo=="401"){
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
    },
      error => {
        this.NitsServices.CargandoDismiss()
        console.log(JSON.stringify(error));
      });
  }

}
