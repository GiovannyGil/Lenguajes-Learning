import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { NavigationExtras, Router } from '@angular/router';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-credito-rotativo',
  templateUrl: './credito-rotativo.page.html',
  styleUrls: ['./credito-rotativo.page.scss'],
})
export class CreditoRotativoPage implements OnInit {
  seguimientos: any
  rotativo: any
  params: any
  initDate: any
  finalDate: any

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.rotativo = this.router.getCurrentNavigation().extras.queryParams.pcredito
  }

  ngOnInit() {
    this.params = {
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      Tipo: CryptoJS.AES.encrypt('ROTA', this.Constants._secret).toString(),
      pagare: CryptoJS.AES.encrypt(this.rotativo.Pagare.toString(), this.Constants._secret).toString(),
      RegistroEmpezar: 0,
      RegistroMostrar: 10
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentas, this.params).subscribe(data => {
      if (data[0][0].Codigo == "401") {
        
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.seguimientos = data[0]
      this.NitsServices.CargandoDismiss()
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  DetalleSeguimientos(data) {
    this.initDate = new Date()
    this.finalDate = new Date()

    var mesesCre = Number(localStorage.getItem("mesesCre"));

    if (mesesCre == 0) {
      this.initDate = 19000101;
    } else {
      this.initDate.setMonth(this.initDate.getMonth() - mesesCre);
    }
    var paramsseguimientocredito = {
      esoperador: localStorage.getItem("esoperador"),
      FechaFinal: this.finalDate,
      FechaInicial: this.initDate,
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      RegistroEmpezar: 0,
      RegistroMostrar: 10,
      Pagare: CryptoJS.AES.encrypt(data.Pagare.toString(), this.Constants._secret).toString()
    }

    let navigationExtras: NavigationExtras = {
      queryParams: { pcredito: data, pparams: paramsseguimientocredito },
    };

    this.router.navigateByUrl('/preseguimiento-creditos', navigationExtras);
  }
}
