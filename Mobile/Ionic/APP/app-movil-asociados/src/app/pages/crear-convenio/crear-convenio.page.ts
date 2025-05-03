import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-convenio',
  templateUrl: './crear-convenio.page.html',
  styleUrls: ['./crear-convenio.page.scss'],
})
export class CrearConvenioPage implements OnInit {
  parametros: any
  convenioSeleccionado: any
  formularioSubmitListener: any;

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    private authService: AuthService,
    public alerCtrl: AlertController,
    public  NitsServices: NitsService,
  ) { }

  ngOnInit() { 
    this.parametrosNovedad();
  }

  ngOnDestroy() {
    if (this.formularioSubmitListener) {
      document.removeEventListener('formularioSubmit', this.formularioSubmitListener);
    }
  }

  parametrosNovedad () {
    this.NitsServices.Cargando();
    this.authService.ApiGetData(this.Constants._APIparametronivedadessolicitud).subscribe(data => {
      this.NitsServices.CargandoDismiss();
      this.parametros = data[0]
      const event = new CustomEvent('obtenerData', {detail: this.parametros})
      document.dispatchEvent(event)
      
      if (!this.formularioSubmitListener) {
        this.formularioSubmitListener = this.handleFormularioSubmit.bind(this);
        document.addEventListener('formularioSubmit', this.formularioSubmitListener);
      }
    },
    err => {
      this.NitsServices.CargandoDismiss();
      this.NitsServices.AlertMsm('Ocurrio un error al consultar los parametros.')
      console.log(err)
    });
  }

  private handleFormularioSubmit(e: any) {
    const datosFormulario = e.detail;
    this.convenioSeleccionado = datosFormulario;
    this.Confirmar();
  }

  async Confirmar(){
    const alert = await this.alerCtrl.create({
     message: "¿Está seguro de hacer esta operación?",
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: data => {
            this.enviarSolicitudConvenio()
          }
        }
      ]
    });
   await alert.present();
  }

  enviarSolicitudConvenio(){
    const parametrosConvenio = {
      Nit: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      Codnovedad: CryptoJS.AES.encrypt(this.convenioSeleccionado.codigo, this.Constants._secret).toString(),
      Cuota: CryptoJS.AES.encrypt(this.convenioSeleccionado.cuotaMensual, this.Constants._secret).toString(),
      Formapago: CryptoJS.AES.encrypt(this.convenioSeleccionado.formaPago, this.Constants._secret).toString(),
      Plazo: CryptoJS.AES.encrypt(this.convenioSeleccionado.plazoMensual, this.Constants._secret).toString(),
      SaldoTotal: CryptoJS.AES.encrypt(this.convenioSeleccionado.saldoTotal, this.Constants._secret).toString(),
      motivo: '',
      origen: CryptoJS.AES.encrypt('APP', this.Constants._secret).toString(),
      fecha: new Date(),
      estado: CryptoJS.AES.encrypt('P', this.Constants._secret).toString(),
    }
    this.NitsServices.Cargando();
    this.authService.ApiSendData(this.Constants._APIAgregarNovedadessolicitud, parametrosConvenio).subscribe(data => {
      this.NitsServices.CargandoDismiss();
      if (data[0][0].resultado){
        this.NitsServices.AlertMsm('Solicitud enviada correctamente.')
      } else {
        this.NitsServices.AlertMsm('Ocurrio un error al procesar la solicitud.')
      }

    },
    err => {
      this.NitsServices.CargandoDismiss();
      this.NitsServices.AlertMsm('Ocurrio un error al procesar la solicitud.')
      console.log(err)
    });
  }
}
