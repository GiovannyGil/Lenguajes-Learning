import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { NavigationExtras, Router } from '@angular/router';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-seguimiento-ahorros',
  templateUrl: './seguimiento-ahorros.page.html',
  styleUrls: ['./seguimiento-ahorros.page.scss'],
})
export class SeguimientoAhorrosPage implements OnInit {
  numeroentidad = localStorage.getItem("numeroentidad")
  ahorro: any
  seguimientos: [{
    fechaTrabajo: string;
    Documento: string;
    positivo: string;
    ValorTransaccion: number;
    Naturaleza: string;
  }]
  paramsseguimientoahorros: any
  initDate: any
  finalDate: any

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.ahorro = this.router.getCurrentNavigation().extras.queryParams.sahorro
  }

  ngOnInit() {
    this.initDate = new Date()
    this.finalDate = new Date()

    var mesesAho = Number(localStorage.getItem("mesesAho"));

    if (mesesAho == 0) {
      this.initDate = 19000101;
    } else {
      this.initDate.setMonth(this.initDate.getMonth() - mesesAho);
    }

    this.paramsseguimientoahorros = {
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador"),
      FechaFinal: this.finalDate,
      FechaInicial: this.initDate,
      Linea: CryptoJS.AES.encrypt(this.ahorro.Linea, this.Constants._secret).toString(),
      NumeroCuenta: CryptoJS.AES.encrypt(this.ahorro.NumeroCuentaAhorros, this.Constants._secret).toString(),
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      RegistroEmpezar: 0,
      RegistroMostrar: 10,
      Tipo: CryptoJS.AES.encrypt(this.ahorro.Tipo, this.Constants._secret).toString(),
      idProducto: this.ahorro.idAhorro
    }

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIseguimientoahorros, this.paramsseguimientoahorros).subscribe(data => {
      if (this.numeroentidad == '0180'){
        for(var i=0;i<data[0].length;i++){
          var SaldoNovedadSinDecimal = data[0][i].ValorTransaccion.split(".")[0]
          data[0][i].ValorTransaccion = SaldoNovedadSinDecimal
        }
      }
      this.NitsServices.CargandoDismiss()
      if (data[0].length > 0) {
        if (data[0][0].Codigo == "401") {

          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }
      }
      if (data[0].length === 0){
        this.NitsServices.AlertMsm('No hay datos recientes para mostrar');
      }
      this.seguimientos = data[0]
    },
      err => {
        console.log(err)
        this.NitsServices.CargandoDismiss()
      });
  }

  DetalleSeguimientos() {
    const navigationExtras: NavigationExtras = {
      queryParams: { pseguimiento: this.seguimientos, pahorro: this.ahorro, pparams: this.paramsseguimientoahorros }
    }

    this.router.navigateByUrl('/preseguimiento-ahorros', navigationExtras);
  }
}
