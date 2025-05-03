import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traslado-ahorros',
  templateUrl: './traslado-ahorros.page.html',
  styleUrls: ['./traslado-ahorros.page.scss'],
})
export class TrasladoAhorrosPage implements OnInit {
  myForm: FormGroup;
  destinoahorros: any
  ahorros: any
  ahorroSelected: any
  paramettersPago: any
  destinoSelected: any
  valor
  parametters ={
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
    public router: Router
  ) {
    this.myForm = this.fb.group({
      ahorroSelected: ['', [Validators.required]],
      destinoSelected: ['', [Validators.required]],
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

   CargarDatos() {
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIOrigenahorros, this.parametters).subscribe(data => {
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

    this.authService.ApiSendData(this.Constants._APIDestinoDestinoahorros, this.parametters).subscribe(data => {
     this.DesencriptarDataAhorro(data)
     this.destinoahorros = data[0]

       },
       err => {
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
          this.Pagar()
          this.inicializarcarcampos()
          }
        }
      ]
    });
   await alert.present();
  }

  Pagar(){
    const cuentaOrigen = `${this.ahorroSelected.Linea}-${this.ahorroSelected.NumeroCuenta}`
    const cuentaDestino = `${this.destinoSelected.Linea}-${this.destinoSelected.NumeroCuenta}`

    if(cuentaOrigen == cuentaDestino){
      this.NitsServices.AlertMsm("No se pueden realizar movimientos hacia la cuenta seleccionada en el origen. Por favor seleccione otra cuenta.")
      return
    }
    this.paramettersPago={
      CedulaAsociado:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      NumeroCuentaOrigenTraslado:CryptoJS.AES.encrypt(this.ahorroSelected.NumeroCuenta, this.Constants._secret).toString(),
      NumeroCuentaDestinoTraslado:CryptoJS.AES.encrypt(this.destinoSelected.NumeroCuenta, this.Constants._secret).toString(),
      Valor:CryptoJS.AES.encrypt(this.valor.replace(/,/g, ""), this.Constants._secret).toString(),
      LineaOrigenTraslado:CryptoJS.AES.encrypt(this.ahorroSelected.Linea, this.Constants._secret).toString(),
      LineaDestinoTraslado:CryptoJS.AES.encrypt(this.destinoSelected.Linea, this.Constants._secret).toString(),
      AgenciaOrigenTraslado: this.ahorroSelected.Agencia,
      AgenciaDestinoTraslado: this.destinoSelected.Agencia,
      esoperador:localStorage.getItem("esoperador")
    } 

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIMovimientotrasladoahorros, this.paramettersPago).subscribe(data => {
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
      }

      convertNumber(data){
        var data1=data.detail.value.replace(/,/g, "")
        var data2=data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.valor=data2
      }


}
