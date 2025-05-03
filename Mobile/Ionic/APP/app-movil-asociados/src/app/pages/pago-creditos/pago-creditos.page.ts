import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-creditos',
  templateUrl: './pago-creditos.page.html',
  styleUrls: ['./pago-creditos.page.scss'],
})
export class PagoCreditosPage implements OnInit {
  myForm: FormGroup;
  creditos: any
  ahorros: any
  ahorroSelected: any
  paramettersPago: any
  creditoSelected
  valor
  paramettercredito ={
     Cedula :CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
     MensajeError: "",
     NumeroError: "",
     operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
     esoperador:localStorage.getItem("esoperador"),

   }
   parametterahorro ={
    CedulaAsociado :CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
     MensajeError: "",
     NumeroError: "",
     Tipoerror:"",
     operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
     esoperador:localStorage.getItem("esoperador"),
   }
   parametterssegundaclave:any
   codigoIngreso
   respuestaCodigo

  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController,
    public router:Router
  ) {
    this.myForm = this.fb.group({
      ahorroSelected: ['', [Validators.required]],
      creditoSelected: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.pattern('[0-9-,]*'),Validators.minLength(1)]],
    })
  }

  ngOnInit(){
  if(localStorage.getItem("manejasegundaclave")=='S'){
    this.IngresarSegundaClave()
  }else{
    // this.NitsServices.Cargando()
    this.CargarDatos()
  }
  }

  async IngresarSegundaClave() {
    const alert = await this.alerCtrl.create({
      header: 'Ingrese su segunda clave',
      inputs: [
        {
          name: 'codigo',
          placeholder: 'Clave'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }, {
          text: 'OK',
          handler: (data) => {
            this.codigoIngreso = data.codigo.replace(/ /g, "")
            if (this.codigoIngreso) {
              this.VerificarSegundaClave();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  VerificarSegundaClave(){
    this.parametterssegundaclave = {
      cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      clave: CryptoJS.AES.encrypt(this.codigoIngreso, this.Constants._secret).toString()
    }
    this.authService.ApiSendData(this.Constants._APIValidarsegundaClave, this.parametterssegundaclave).subscribe(resp => {

    this.respuestaCodigo = resp[0][0].Codigo.replace(/ /g, "")

    if(this.respuestaCodigo==='115'){
          this.CargarDatos()
    }

    if(this.respuestaCodigo==='820'){
     this.router.navigateByUrl('/publicidad')
     this.ahorros=[]
     this.creditos=[]
   }

    this.NitsServices.mostrarMensajes(resp)

    }, err => {
      console.log(err)
    });
    }


  CargarDatos() {
    this.authService.ApiSendData(this.Constants._APIOrigenahorros, this.parametterahorro).subscribe(data => {
      this.DesencriptarDataAhorro(data)
      if(data[0][0].Codigo!=undefined){
        if(data[0][0].Codigo=="401"){
          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }else if(data[0][0].Codigo=="404"){
          this.NitsServices.mostrarMensajes(data)
        }
      }
      this.ahorros = data[0]
        },
        err => {
          console.log(err)
         });
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIDestinoPagoCreditos, this.paramettercredito).subscribe(data => {
    this.NitsServices.CargandoDismiss()
      this.DesencriptarDataCredito(data)
     this.creditos = data[0]

       },
       err => {
        this.NitsServices.CargandoDismiss()
         console.log(err)
        });
  }

  async Confirmar(){
    const alert = await this.alerCtrl.create({
     message: "El monto a pagar es $ " +
      (this.valor) +
      "<br> ¿Está seguro de hacer esta operación?",
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: data => {
            this.inicializarcarcampos()
          }
        },
        {
          text: 'OK',
          handler: data => {
          if (this.valor === '0' || this.valor < '0'){
            this.NitsServices.AlertMsm("Digite un valor mayor a 0")
            this.inicializarcarcampos()
            return
          }else {
            this.Pagar()
            this.inicializarcarcampos()
          }
          }
        }
      ]
    });
   await alert.present();
  }

Pagar(){
  this.paramettersPago={
    CedulaAsociado:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    NumeroCuentaOrigenAhorro:CryptoJS.AES.encrypt(this.ahorroSelected.NumeroCuenta, this.Constants._secret).toString(),
    Pagare:CryptoJS.AES.encrypt(this.creditoSelected.PAGARE, this.Constants._secret).toString(),
    Valor:CryptoJS.AES.encrypt(this.valor.replace(/,/g, ""), this.Constants._secret).toString(),
    LineaOrigenAhorro:CryptoJS.AES.encrypt(this.ahorroSelected.Linea, this.Constants._secret).toString(),
    Linea:CryptoJS.AES.encrypt(this.creditoSelected.CodigoLinea, this.Constants._secret).toString(),
    Agencia: this.ahorroSelected.Agencia,
    esoperador:localStorage.getItem("esoperador")
  }

  this.NitsServices.Cargando()
  this.authService.ApiSendData(this.Constants._APIPagocreditos, this.paramettersPago).subscribe(data => {
  this.NitsServices.CargandoDismiss()

  if(data[0][0].Codigo!=undefined){
    if(data[0][0].Codigo=="401"){
      localStorage.clear()
      this.NitsServices.LogIn()
      this.NitsServices.mostrarMensajes(data)
      return
    }
  }
  this.NitsServices.mostrarMensajes(data)

      },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
       });
}

  DesencriptarDataAhorro(data){
    var empieza = 0
    var cuantos = data[0].length
if(data[0][0].NumeroCuenta!=undefined){
    while (empieza >= 0 && empieza < cuantos) {
        var NumeroCuenta = CryptoJS.AES.decrypt(
          data[0][empieza].NumeroCuenta,
          this.Constants._secret
      );

        var SaldoTotal = CryptoJS.AES.decrypt(
          data[0][empieza].SaldoTotal,
          this.Constants._secret
      );
      data[0][empieza].NumeroCuenta = CryptoJS.enc.Utf8.stringify(NumeroCuenta);
      data[0][empieza].SaldoTotal = CryptoJS.enc.Utf8.stringify(SaldoTotal);
      empieza++
    }
  }

    return data
  }

DesencriptarDataCredito(data){
    var empieza = 0
    var cuantos = data[0].length
  if(cuantos>0){
      if(data[0][0].PAGARE!=undefined){
          while (empieza >= 0 && empieza < cuantos) {
              var PAGARE = CryptoJS.AES.decrypt(
                data[0][empieza].PAGARE,
                this.Constants._secret
            );

              var saldoCapital = CryptoJS.AES.decrypt(
                data[0][empieza].saldoCapital,
                this.Constants._secret
            );
            data[0][empieza].PAGARE = CryptoJS.enc.Utf8.stringify(PAGARE);
            data[0][empieza].saldoCapital = CryptoJS.enc.Utf8.stringify(saldoCapital);
            empieza++
          }
        }
      }
    return data
  }

    inicializarcarcampos(){
      this.valor=""
      this.ahorroSelected=""
      this.creditoSelected=""
    }

    convertNumber(data){
      var data1=data.detail.value.replace(/,/g, "")
      var data2=data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      this.valor=data2
    }

}
