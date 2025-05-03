import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Router } from '@angular/router';
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-estado-cuentas',
  templateUrl: './estado-cuentas.page.html',
  styleUrls: ['./estado-cuentas.page.scss'],
})
export class EstadoCuentasPage implements OnInit {
  numeroentidad=localStorage.getItem("numeroentidad")
  ahorros=[]
  creditos=[]
  novedades=[]
  debitos=[]

  params={
    CedulaAsociado:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    Tipo:'',
    pagare:CryptoJS.AES.encrypt("0", this.Constants._secret).toString(),
    RegistroEmpezar: 0,
    RegistroMostrar: 10
    }

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.Ahorros()
    this.Creditos()
    this.Novedades()
    this.Debitos()
  }

  SeguimientoAhorros(data){
    this.router.navigateByUrl('/seguimiento-ahorros', {queryParams:{sahorro: data}});
  }

  SeguimientoCreditos(data){
    this.router.navigateByUrl('/seguimiento-creditos', {queryParams:{scredito: data}});
  }

  SeguimientoNovedades(data){
    this.router.navigateByUrl('/seguimiento-novedades', {queryParams: {snovedad: data}});
  }

  SeguimientoDebitos(data){
    this.router.navigateByUrl('/seguimiento-debitos-automaticos', {queryParams:{sdebito: data}});
  }

  Ahorros(){
    this.params.Tipo=CryptoJS.AES.encrypt("AHORRO", this.Constants._secret).toString()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentas, this.params).subscribe(data => {
    if (this.numeroentidad == '0180'){
      for(var i=0;i<data[0].length;i++){
        var SaldoTotalCuentaSinDecimal = data[0][i].SaldoTotalCuenta.split(".")[0]
        data[0][i].SaldoTotalCuenta = SaldoTotalCuentaSinDecimal
      }
    }
      if(data[0][0].Codigo=="401"){

        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.ahorros = data[0]
        },
        err => {
          console.log(err)
         });
  }

  Creditos(){
    this.params.Tipo=CryptoJS.AES.encrypt("CREDIT", this.Constants._secret).toString()
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentas, this.params).subscribe(data => {
      if (this.numeroentidad == '0180'){
      for(var i=0;i<data[0].length;i++){
        var SaldoCapitalSinDecimal = data[0][i].SaldoCapital.split(".")[0]
        data[0][i].SaldoCapital = SaldoCapitalSinDecimal
      }
    }
      this.NitsServices.CargandoDismiss()
      this.creditos = data[0]
        },
        err => {
          this.NitsServices.CargandoDismiss()
          console.log(err)
         });
  }

  Novedades(){
    this.params.Tipo=CryptoJS.AES.encrypt("ESTNOV", this.Constants._secret).toString()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentas, this.params).subscribe(data => {
      if (this.numeroentidad == '0180'){
      for(var i=0;i<data[0].length;i++){
        var SaldoNovedadSinDecimal = data[0][i].SaldoNovedad.split(".")[0]
        data[0][i].SaldoNovedad = SaldoNovedadSinDecimal
      }
    }
      this.novedades = data[0]
        },
        err => {
          console.log(err)
         });
  }

  Debitos(){
    this.params.Tipo=CryptoJS.AES.encrypt("ESTDEB", this.Constants._secret).toString()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentas, this.params).subscribe(data => {
    if (this.numeroentidad == '0045'){
      for(var i=0;i<data[0].length;i++){
        var ValorADebitarSinDecimal = data[0][i].ValorADebitar.split(".")[0]
        data[0][i].ValorADebitar = ValorADebitarSinDecimal
      }
    }
      this.debitos = data[0]
        },
        err => {
          console.log(err)
         });
  }


}
