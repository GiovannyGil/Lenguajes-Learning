import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { NavigationExtras, Router } from '@angular/router';
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-seguimiento-novedades',
  templateUrl: './seguimiento-novedades.page.html',
  styleUrls: ['./seguimiento-novedades.page.scss'],
})
export class SeguimientoNovedadesPage implements OnInit {
  novedad: any
  seguimientos: [{
    fechapago: string;
    documento: string;
    positivo: string;
    naturaleza: string;
    valor: number;
  }]
  paramsseguimientonovedades: any
  initDate: any
  finalDate: any

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.novedad=this.router.getCurrentNavigation().extras.queryParams.snovedad
   }

  ngOnInit() {
    this.initDate=new Date()
      this.finalDate=new Date()

      var mesesNov=Number(localStorage.getItem("mesesNov"));

      if (mesesNov == 0) {
        this.initDate = 19000101;
    } else {
        this.initDate.setMonth(this.initDate.getMonth() - mesesNov);
    }

      this.paramsseguimientonovedades={
        cedulasociado:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
        esoperador:localStorage.getItem("esoperador"),
        FechaFinal: this.finalDate,
        FechaInicial: this.initDate,
        Linea:CryptoJS.AES.encrypt(this.novedad.codnovedad, this.Constants._secret).toString(),
        operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
        RegistroEmpezar:0,
        RegistroMostrar:10,
        idProducto: this.novedad.novedadId
      }
      this.NitsServices.Cargando()
      this.authService.ApiSendData(this.Constants._APIseguimientoNovedades, this.paramsseguimientonovedades).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if(data[0].length>0){
      if(data[0][0].Codigo=="401"){

        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
    }
    if (data[0].length === 0){
      this.NitsServices.AlertMsm('No hay datos recientes para mostrar');
    }
        this.seguimientos=data[0]
          },
          err => {
            console.log(err)
           });
  }

  DetalleSeguimientos(){
    const navigationExtras: NavigationExtras = {
      queryParams: {pseguimiento: this.seguimientos, pnovedad:this.novedad, pparams: this.paramsseguimientonovedades}
    }
    this.router.navigateByUrl('/preseguimiento-novedades', navigationExtras);
  }
}
