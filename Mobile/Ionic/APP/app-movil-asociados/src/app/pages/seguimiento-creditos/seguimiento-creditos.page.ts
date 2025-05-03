import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { NavigationExtras, Router } from '@angular/router';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-seguimiento-creditos',
  templateUrl: './seguimiento-creditos.page.html',
  styleUrls: ['./seguimiento-creditos.page.scss'],
})
export class SeguimientoCreditosPage implements OnInit {
  numeroentidad = localStorage.getItem("numeroentidad")
  credito: any
  seguimientos: [{
    fechaTrabajo: string;
    Documento: string;
    ValorTransaccion: number | string;
    ConsignacionTotal: string;
  }]
  paramsseguimientocredito: any
  initDate: any
  finalDate: any

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.credito = this.router.getCurrentNavigation().extras.queryParams.scredito
  }

  ngOnInit() {
    this.initDate = new Date()
    this.finalDate = new Date()

    var mesesCre = Number(localStorage.getItem("mesesCre"));

    if (mesesCre == 0) {
      this.initDate = 19000101;
    } else {
      this.initDate.setMonth(this.initDate.getMonth() - mesesCre);
    }

    this.paramsseguimientocredito = {
      esoperador: localStorage.getItem("esoperador"),
      FechaFinal: this.finalDate,
      FechaInicial: this.initDate,
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      RegistroEmpezar: 0,
      RegistroMostrar: 10,
      Pagare: CryptoJS.AES.encrypt(this.credito.Pagare.toString(), this.Constants._secret).toString(),
      idProducto: this.credito.idProducto,
    }

    this.authService.ApiSendData(this.Constants._APIseguimientoCreditos, this.paramsseguimientocredito).subscribe(data => {
      if (this.numeroentidad == '0180'){
        for(var i=0;i<data[0].length;i++){
          var SaldoNovedadSinDecimal = data[0][i].ConsignacionTotal.split(".")[0]
          data[0][i].ConsignacionTotal = SaldoNovedadSinDecimal
        }
      }

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
      });
  }

  DetalleSeguimientos() {
    if (this.credito.esrotativo === "S") {
      const navigationExtras: NavigationExtras = {
        queryParams: { pcredito: this.credito }
      }
      this.router.navigateByUrl('/credito-rotativo', navigationExtras)
    } else {
      const navigationExtras: NavigationExtras = {
        queryParams: { pseguimiento: this.seguimientos, pcredito: this.credito, pparams: this.paramsseguimientocredito }
      }
      this.router.navigateByUrl('/preseguimiento-creditos', navigationExtras);
    }
  }

  planDePagos () {
    let params = {
      Pagare: this.credito.Pagare.toString(),
      canal: "AppAsociados"
    }
    this.NitsServices.Cargando();
    this.authService.ApiSendData(this.Constants._APIsolicitarPlanDePagos,params).subscribe(data =>  {
      this.NitsServices.CargandoDismiss();
      if (data[0].isGenerated) {
        this.NitsServices.AlertMsm('Su solicitud ya fue radicada, la información solicitada estará llegando a su correo personal en el transcurso del día.')
      } else {
        switch (data[0].errors[0]) {
          case 'RB508':
            this.NitsServices.AlertMsm('Excediste el limite de solicitudes por mes.')
            break;
          default:
            this.NitsServices.AlertMsm('Su solicitud no fue procesada, por favor verifique.')
            break;
        }
      }
    }, err => {
      this.NitsServices.AlertMsm('Servicio no disponible en este momento, por favor intente mas tarde o comuniquese con la entidad.')
    });
  }
}
