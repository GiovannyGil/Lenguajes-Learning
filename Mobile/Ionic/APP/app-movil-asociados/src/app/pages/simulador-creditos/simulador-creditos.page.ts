import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-simulador-creditos',
  templateUrl: './simulador-creditos.page.html',
  styleUrls: ['./simulador-creditos.page.scss'],
})
export class SimuladorCreditosPage implements OnInit {
  myForm: FormGroup;
  formCuotasExtra: FormGroup;
  paramslinea = {}
  periodicidad:any[] = []
  linea: any
  destino: any
  totalsimulacion: any
  muestraextras
  input = {
    CodLinea: '',
    Coddestino: '',
    periodicidad: '',
    Capitalprestar: '',
    plazo: '',
    cuotasExtras: []
  }
  cuotaExtra = {
    Numero: '',
    Abono: ''
  }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.myForm = this.fb.group({
      CodLineaSelected: ['', [Validators.required]],
      CoddestinoSelected: ['', [Validators.required]],
      periodicidadSelected: ['', [Validators.required]],
      Capitalprestar: ['', [Validators.required, Validators.pattern('[0-9-,]*'), Validators.minLength(1)]],
      plazo: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]],
    })
    this.formCuotasExtra = this.fb.group({
      numcuota: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]],
      valor: ['', [Validators.required, Validators.pattern('[0-9-,]*'), Validators.minLength(1)]],
    })

    this.muestraextras = false
  }

  ngOnInit() {
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorCreditos_BuscarLineas, this.paramslinea).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0].length > 0) {
        if (data[0][0].Codigo == "401") {

          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }
      }
      this.linea = data[0]
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }
  SearchDestinos(linea) {
    if (!linea) return;
    var paramdestino = {
      objeto: {
        CodLinea: linea
      }
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorCreditos_BuscarDestinos, { data: paramdestino }).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0][0].Codigo == "401") {

        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.destino = data[0]
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  searchPeriodicidad(Coddestino) {
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorCreditos_BuscarPeriodicidad, {data: Coddestino}).subscribe(data => {
      this.NitsServices.CargandoDismiss()

      if (data[0].length > 0) {
        if (data[0][0].Codigo == "401") {
          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }
      }
      this.periodicidad = data[0]
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }


  Simular() {
    var paramsimulacion = {
      objeto: {
        CodLinea: this.input.CodLinea,
        Coddestino: this.input.Coddestino,
        periodicidad: this.input.periodicidad,
        Capitalprestar: this.input.Capitalprestar.replace(/,/g, ""),
        plazo: this.input.plazo,
        cedula: localStorage.getItem("operador"),
        cuotasExtras:  this.input.cuotasExtras
      }
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APISimuladorCreditos_calcular, paramsimulacion).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (!data['Cuota']) {
        if (data['Mensaje']) {
          this.NitsServices.AlertMsm(data['Mensaje'])
          return
        }
        if (data[0][0].Codigo == "401") {

          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }
      }
      this.totalsimulacion = data

      const navigationExtras: NavigationExtras = {
        queryParams: { totalsimulacion: this.totalsimulacion, paraimpresion: paramsimulacion }
      }

      this.router.navigateByUrl('/total-simuladorcreditos', navigationExtras);
      this.Limpiar()
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  MuestraExtra() {
    this.muestraextras = true;
  }

  AgregarExtra() {
    var cuota = { Numero: '', Abono: '' };
    cuota.Numero = this.cuotaExtra.Numero;
    cuota.Abono = this.cuotaExtra.Abono.replace(/,/g, "");
    this.input.cuotasExtras.push(cuota);
    //console.log(this.input.cuotasExtras)
  }

  Limpiar() {
    this.input = {
      CodLinea: '',
      Coddestino: '',
      periodicidad: '',
      Capitalprestar: '',
      plazo: '',
      cuotasExtras: []
    }
    this.cuotaExtra = {
      Numero: '',
      Abono: ''
    }
    this.muestraextras = false;
  }

  convertNumber(data) {
    var data1 = data.detail.value.replace(/,/g, "")
    var data2 = data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.input.Capitalprestar = data2
  }

  convertNumberExtra(data) {
    var data1 = data.detail.value.replace(/,/g, "")
    var data2 = data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.cuotaExtra.Abono = data2
  }
}
