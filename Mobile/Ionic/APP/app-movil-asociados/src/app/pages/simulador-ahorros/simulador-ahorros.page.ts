import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-simulador-ahorros',
  templateUrl: './simulador-ahorros.page.html',
  styleUrls: ['./simulador-ahorros.page.scss'],
})
export class SimuladorAhorrosPage implements OnInit {
  myForm: FormGroup;
  DestinosSelected: any
  PlazoSelected: any
  PeriodoDiasSelected: any
  CapitalizacionSelected: any
  destinos: any
  plazos: any
  plazosdias: any
  data: any
  totalsimulacion: any
  Valor
  paramdestinos = {}
  numeroEntidad = ''

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
  ) {

    this.numeroEntidad = localStorage.getItem("numeroentidad")
    let capitaliza = this.manejaCapitalizacion()

    this.myForm = this.fb.group({
      DestinosSelected: ['', [Validators.required]],
      PlazoSelected: ['', [Validators.required]],
      PeriodoDiasSelected: ['', [Validators.required]],
      CapitalizacionSelected: capitaliza? ['', [Validators.required]]: [''],
      Valor: ['', [Validators.required, Validators.pattern('[0-9-,]*'), Validators.minLength(1)]],
    })
  }

  ngOnInit() {
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorAhorros_BuscarDestinosAhorros, this.paramdestinos).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0].length > 0) {
        if (data[0][0].Codigo == "401") {

          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }
      }
      this.destinos = data[0]
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });

    if (this.numeroEntidad === '0091') {

    }
  }

  SearchPlazo(destino) {
    if (!destino) return;
    var paramplazo = {
      objeto: {
        Destino: destino
      }
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorAhorros_BuscarPlazoAhorros, { data: paramplazo }).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0][0].Codigo == "401") {

        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.plazos = data[0]
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  SearchPlazoDias(destino, plazo) {
    if (!destino || !plazo) return;
    var paramplazodia = {
      objeto: {
        Destino: destino,
        plazo: plazo
      }
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorAhorros_ComboPeriodoLiquida, { data: paramplazodia }).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0][0].Codigo == "401") {


        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.plazosdias = data[0]
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  Simular() {
    var paramsimulacion = {
      objeto: {
        Capital: this.Valor.replace(/,/g, ""),
        capitalizacion: this.manejaCapitalizacion() ? this.CapitalizacionSelected : '2',
        Destino: this.DestinosSelected,
        periodoDias: this.PeriodoDiasSelected,
        plazo: this.PlazoSelected,
        Totales: true
      }
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorAhorros_calcular, { data: paramsimulacion }).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0][0].Codigo == "401") {

        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.totalsimulacion = data[0][0]

      const navigationExtras: NavigationExtras = {
        queryParams: { totalsimulacion: this.totalsimulacion, paraimpresion: paramsimulacion }
      }

      this.router.navigateByUrl('/total-simuladorahorros', navigationExtras);
      this.Limpiar()
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }


  Limpiar() {
    this.DestinosSelected = ""
    this.PlazoSelected = ""
    this.PeriodoDiasSelected = ""
    this.CapitalizacionSelected = ""
    this.Valor = ""
  }

  convertNumber(data) {
    var data1 = data.detail.value.replace(/,/g, "")
    var data2 = data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.Valor = data2
  }

  manejaCapitalizacion() {
    let manejaCapitalizacionR = true
    switch (this.numeroEntidad) {
      case '0091':
        manejaCapitalizacionR = false
        break;
      default:
        manejaCapitalizacionR = true
        break;
    }
    return manejaCapitalizacionR
  }

}
