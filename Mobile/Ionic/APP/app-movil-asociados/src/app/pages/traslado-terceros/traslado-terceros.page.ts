import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traslado-terceros',
  templateUrl: './traslado-terceros.page.html',
  styleUrls: ['./traslado-terceros.page.scss'],
})
export class TrasladoTercerosPage implements OnInit {
  myForm: FormGroup;
  destinoahorros: any
  ahorros: any
  ahorroSelected: any
  paramettersPago: any
  destinoSelected: any
  cedulaterceroInput
  valor
  paramettersorigen ={
    CedulaAsociado :CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
     MensajeError: "",
     NumeroError: "",
     Tipoerror:"",
     operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
     esoperador:"N",
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
      destinoSelected: ['', [Validators.required]],
      cedulaterceroInput: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.pattern('[0-9-,]*'),Validators.minLength(1)]],
    })
  }

  ngOnInit(){
    if(localStorage.getItem("manejasegundaclave")=='S'){
      this.IngresarSegundaClave()
    }else{
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
       this.destinoahorros=[]
     }

      this.NitsServices.mostrarMensajes(resp)

      }, err => {
        console.log(err)
      });
      }

  CargarDatos(){
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIOrigenahorros, this.paramettersorigen).subscribe(data => {
    this.NitsServices.CargandoDismiss()
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
          this.NitsServices.CargandoDismiss()
          console.log(err)
         });
  }

  cuentastercero(cedulatercero){
    var paramettersdestino ={
      CedulaAsociado :CryptoJS.AES.encrypt(cedulatercero.toString(), this.Constants._secret).toString(),
       MensajeError: "",
       NumeroError: "",
       Tipoerror:"",
       operador: CryptoJS.AES.encrypt(cedulatercero.toString(), this.Constants._secret).toString(),
       esoperador:"N",
     }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIDestinoDestinoahorros, paramettersdestino).subscribe(data => {
    this.NitsServices.CargandoDismiss()
      this.DesencriptarDataAhorro(data)
      this.destinoahorros = data[0]

      if(data[0][0].Codigo!=undefined){
          this.NitsServices.mostrarMensajes(data)
      }

        },
        err => {
          this.NitsServices.CargandoDismiss()
          console.log(err)
         });
    console.log(cedulatercero)
  }

  async Confirmar(){
    const alert = await this.alerCtrl.create({
     message: "El monto a trasladar es $ " +
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
          this.Pagar()
          this.inicializarcarcampos()
          }
        }
      ]
    });
   await alert.present();
  }

  Pagar(){
    if(this.ahorroSelected.Linea === this.destinoSelected.Linea && this.ahorroSelected.NumeroCuenta === this.destinoSelected.NumeroCuenta){
      this.NitsServices.AlertMsm("No se pueden realizar movimientos hacia la cuenta seleccionada en el origen. Por favor seleccione otra cuenta.")
      return
    }
    this.paramettersPago={
      CedulaAsociado:localStorage.getItem("operador"),
      operador:localStorage.getItem("operador"),
      NumeroCuentaOrigenTraslado:this.ahorroSelected.NumeroCuenta,
      NumeroCuentaDestinoTraslado:this.destinoSelected.NumeroCuenta,
      Valor:this.valor.replace(/,/g, ""),
      LineaOrigenTraslado:this.ahorroSelected.Linea,
      LineaDestinoTraslado:this.destinoSelected.Linea,
      AgenciaOrigenTraslado: this.ahorroSelected.Agencia,
      AgenciaDestinoTraslado: this.destinoSelected.Agencia,
      esoperador:localStorage.getItem("esoperador"),
      cedulatercero: this.cedulaterceroInput
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APImovimientoTercero, this.paramettersPago).subscribe(data => {
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

      inicializarcarcampos(){
        this.valor=""
        this.ahorroSelected=""
        this.destinoSelected=""
        this.cedulaterceroInput=""
      }

      convertNumber(data){
        var data1=data.detail.value.replace(/,/g, "")
        var data2=data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.valor=data2
      }

}
