import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {
  slideOpts = {
    autoplay: true,
    speed: 2000
  }
  datos: any
  visualiza
  ahorros: any
  // config creditos digitales
  creditosDigitalesConfig = {}
  preaprobado: Boolean = false;
  creditosDigitalesCuentasDeAhorro = []
  parametters = {
    CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    MensajeError: "",
    NumeroError: "",
    Tipoerror: "",
    operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    esoperador: localStorage.getItem("esoperador"),
  }

  mensajePreaprobado = "";
  creditosDigitalesParametros = {};
  constructor(
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public router:Router
  ) {
    localStorage.setItem("mostrarMenu", "S")
    localStorage.setItem("mostrarDatos", "S")
   }

  ngOnInit() {
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIPublicidad, { esoperador: localStorage.getItem("esoperador") }).subscribe(data => {
    this.NitsServices.CargandoDismiss()
      if (data[1].length > 0) {
        this.datos = data[1]
        this.visualiza = 'S'
      }
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
    this.CargarDatosInicio()
  }

  CargarDatosInicio() {
    var paraInicio = {
      esoperador: localStorage.getItem("esoperador"),
      codcajero: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString()
    }
    this.authService.ApiSendData(this.Constants._APICargarDatosInicio, paraInicio).subscribe(res => {
      this.NitsServices.CargandoDismiss()
      localStorage.setItem("mesesAho", res[0][0].mesesAho)
      localStorage.setItem("mesesCre", res[0][0].mesesCre)
      localStorage.setItem("mesesNov", res[0][0].mesesNov)
      localStorage.setItem("detalleAho", res[0][0].detalleAho)
      localStorage.setItem("detalleCre", res[0][0].detalleCre)
      localStorage.setItem("detalleNov", res[0][0].detalleNov)
      localStorage.setItem("manejapreguntasCP", res[0][0].manejapreguntasCP)
      localStorage.setItem("manejapreguntasSC", res[0][0].manejapreguntasSC)
      localStorage.setItem("manejasegundaclave", res[0][0].manejasegundaclave)
      localStorage.setItem("permisosoperador", res[0][0].permisosoperador)
      let paramsA = {
        CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
        MensajeError: "",
        NumeroError: ""
      }
      this.authService.ApiSendData(this.Constants._APIDatosAsociados, paramsA).subscribe(data => {
        this.NitsServices.CargandoDismiss()
        let agencia = data[0][0].agencia
        localStorage.setItem("agenciaAso", agencia);
      },
      err => {
        console.log(err)
      })
    }, err => {
      console.log(err)
    });
  }

}
