import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-preseguimiento-ahorros',
  templateUrl: './preseguimiento-ahorros.page.html',
  styleUrls: ['./preseguimiento-ahorros.page.scss'],
})
export class PreseguimientoAhorrosPage implements OnInit {
  numeroentidad=localStorage.getItem("numeroentidad")
  seguimientos:any
  ahorro: any
  params: any
  dateFrom: any
  dateTo: any
  fechainicio: any
  fechafinal: any
  mostrardetalle
  notmoreData: any

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.mostrardetalle=localStorage.getItem("detalleAho")
    this.seguimientos=this.router.getCurrentNavigation().extras.queryParams.pseguimiento
    this.ahorro=this.router.getCurrentNavigation().extras.queryParams.pahorro
    this.params=this.router.getCurrentNavigation().extras.queryParams.pparams
   }

  ngOnInit() {
    this.fechainicio=new Date()
    this.fechafinal=new Date()

    var mesesAho= Number(localStorage.getItem("mesesAho"));

    if (mesesAho == 0) {
      this.dateFrom = '1900-01-01';
  } else {
      this.fechainicio.setMonth(this.fechainicio.getMonth() - mesesAho);
      this.dateFrom= this.dateToNumber(this.fechainicio)//para mostrar en input
  }
  this.dateTo=this.dateToNumber(this.fechafinal)//para mostrar en input

  this.params.FechaInicial=Number(this.dateFrom.replace(/-/g, ""))
  this.params.FechaFinal=Number(this.dateTo.replace(/-/g, ""))
  this.authService.ApiSendData(this.Constants._APIseguimientoahorros, this.params).subscribe(data => {
  if(data[0].length>0){
    if(data[0][0].Codigo=="401"){

      this.NitsServices.mostrarMensajes(data)
      localStorage.clear()
      this.NitsServices.LogIn()
      return
    }
  }
    this.notmoreData=true
    this.seguimientos=data[0]
      },
      err => {
        console.log(err)
       });
  }

  onChangeDate()
{
  // this.params.FechaInicial=Number(this.dateFrom.replace(/-/g, ""))
  // this.params.FechaFinal=Number(this.dateTo.replace(/-/g, ""))
  this.params.FechaInicial=this.dateFrom
  this.params.FechaFinal=this.dateTo
  this.consultar()
}


consultar(){
  this.authService.ApiSendData(this.Constants._APIseguimientoahorros, this.params).subscribe(data => {
  if(data[0].length>0){
    if(data[0][0].Codigo=="401"){

      this.NitsServices.mostrarMensajes(data)
      localStorage.clear()
      this.NitsServices.LogIn()
      return
    }
  }
    this.notmoreData = !data[0].length
                    ? true
                    : Math.ceil(data[0][data[0].length - 1].Numero / 10.0) ===
                    data[0][data[0].length - 1].npaginas;

    this.seguimientos=data[0]
      },
      err => {
        console.log(err)
       });
}

  dateToNumber(date) {
    var month = date.getUTCMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = date.getUTCDate();
    day = day < 10 ? "0" + day : day;
    return date.getUTCFullYear() + "-" + month + "-" + day;
}

Detalle(data){
  if(this.mostrardetalle=='S'){
    const navigationExtras: NavigationExtras = {
      queryParams: {detalle: data}
    }

    this.router.navigateByUrl('/detalle-ahorros', navigationExtras)
  }
}

loadMore(event){
 this.params.RegistroMostrar +=10;
 this.consultar()
 event.target.complete()
}

}
