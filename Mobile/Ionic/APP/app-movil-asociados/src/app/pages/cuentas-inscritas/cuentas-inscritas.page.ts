import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas-inscritas',
  templateUrl: './cuentas-inscritas.page.html',
  styleUrls: ['./cuentas-inscritas.page.scss'],
})
export class CuentasInscritasPage implements OnInit {
  deshabilitado: any
  cuentas: any
  params
  constructor(
    // public fb: FormBuilder,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.cuentasInscritas()
  }

  cuentasInscritas() {
    this.params = {
      idmatricula: null,
      accion: 'C'
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIBuscarCuentaTraslado, this.params).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      this.cuentas = data[0].filter(item => item.Estado === "A" && item.cedulaOrigen === localStorage.getItem("operador") && item.canal != 'WEB');
      if (this.cuentas.length === 0){
        this.NitsServices.AlertMsm("No tienes ninguna cuenta matriculada")
        this.router.navigateByUrl('/inscripcion-traslado-asociados')
      }
    },
      err => {
        console.log(err)
      });
  }

  async AlertConfirm(idMatricula) {
    const alert = await this.alerCtrl.create({
      header: 'Confirmacion',
      message: 'Estas seguro de inactivar la cuenta matriculada?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        }, {
          text: 'ACEPTAR',
          handler: () => {
            this.inactivarMatricula(idMatricula)
          }
        }
      ]
    });
    await alert.present();
  }

  inactivarMatricula(idMatricula) {
    this.params = {
      cedulaorigen: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      xml: `<tmpasociadosinactivosjdr><nidmatriculatraslado>${idMatricula}</nidmatriculatraslado></tmpasociadosinactivosjdr>`,
      caso: 5
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIInscripcionCuentaTraslado, this.params).subscribe(data => {
      this.NitsServices.CargandoDismiss()

      if (data[0][0].Respuesta === 1) {
        this.NitsServices.AlertMsm("Se inactivo la cuenta")
        this.cuentasInscritas()
      }

    },
      err => {
        console.log(err)
      });
  }
}
