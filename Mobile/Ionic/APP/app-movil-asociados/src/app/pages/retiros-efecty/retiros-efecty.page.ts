import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-retiros-efecty',
  templateUrl: './retiros-efecty.page.html',
  styleUrls: ['./retiros-efecty.page.scss'],
})
export class RetirosEfectyPage implements OnInit {
  myForm: FormGroup;
  ahorros: any
  ahorroSelect: any
  valorcomision
  total
  valor
  Total = {
    Valor: "0"
  }
  valorGmf
  costotransaccion
  valorRetiro
  inputDeshabilitado;
  params={
    CedulaAsociado:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    Tipo:'',
    pagare:CryptoJS.AES.encrypt("0", this.Constants._secret).toString(),
    RegistroEmpezar: 0,
    RegistroMostrar: 10
  }
  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController,
    private toastController: ToastController
  ) { 
    this.myForm = this.fb.group({
      ahorroSelect: ['', [Validators.required]],
      valorRetiro: ['', [Validators.required]],
      costotransaccion: [''],
    })
  }

  ngOnInit() {
    this.AhorrosAV();
    this.valorComision();
  }

  AhorrosAV() {
    this.params.Tipo=CryptoJS.AES.encrypt("AHORRO", this.Constants._secret).toString()
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentas, this.params).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      const ahorrosALaVista = data[0].filter(item => item.Tipo === 'AV')
      this.inputDeshabilitado = ahorrosALaVista.length === 0;
      this.ahorros = ahorrosALaVista
    },
    err => {
      console.log(err)
    });
  }

  valorComision(){
    this.authService.ApiSendData(this.Constants._APIRangosEfecty, null).subscribe(data => {
      this.valorcomision = data[0]
    },
    err => {
      console.log(err)
    });
  }
  
  calculoGmf(valorCalcular) {
    const paramsGmf = {
      Cedula: this.params.CedulaAsociado,
      codlinea: this.ahorroSelect.Linea,
      valorRetiro: parseInt(valorCalcular),
    } 
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIGmf, paramsGmf).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      this.valorGmf = data[0][0].gmf
      this.Total.Valor = this.total + this.valorGmf
      this.Total.Valor = this.format(parseInt(this.Total.Valor))
    },
    err => {
      console.log(err)
    });
  }

  changeFn(e) {
    const inputValue = parseFloat(e.detail.value);
    if (!isNaN(inputValue)) {
      this.total = inputValue;
  
      if (Array.isArray(this.valorcomision)) {
        const filtroRango = this.valorcomision.filter(data => this.total >= data.SaldoDesde && this.total <= data.SaldoHasta);
        this.costotransaccion = filtroRango.length > 0 ? filtroRango[0].ValorComision : 0;
        this.total = this.total + this.costotransaccion;
        this.Total.Valor = this.format(this.total)
      } else {
        this.Total.Valor = '0'
        console.error("valorcomision no es un array válido");
      }
    } else {
      this.Total.Valor = '0'
      console.error("El valor no es un número válido");
    }
  }
  
  format(input) {
    var num = input
    if (!isNaN(num)) {
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/, '');
      return num;
    }
    else {
      this.total = '0'
      this.NitsServices.AlertMsm('Solo se permiten numeros');
      return '0'
    }
  }

  quitarCaracter (caracter, value) {
    let palabra = value;
    if (palabra == null || caracter == null) {
      return null;
    }
    while(palabra.indexOf(caracter) != -1){
      palabra = palabra.replace(caracter,'');    
    }
    return parseInt(palabra);
  }

  Solicitar() {
    let value = this.ahorroSelect.SaldoTotalCuenta
    const saldoCuenta = this.quitarCaracter(",", value);
    const saldoARetirar = this.quitarCaracter(".", this.Total.Valor);
    if (saldoARetirar > saldoCuenta) {
      this.NitsServices.AlertMsm("El valor digitado es mayor al saldo de la cuenta verifique...")
      this.inicializarcarcampos();
      return;
    }
    const dataEfecty = {
      cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      pass: localStorage.getItem("ps"),
      valorRetiro: this.valorRetiro
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIValidacionEfecty, dataEfecty).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0].result) {
        this.tiempoParametro(data[0].otp)
      } else {
        this.NitsServices.AlertMsm(data[0].message)
      }
    },
    err => {
      console.log(err.error)
      this.NitsServices.CargandoDismiss();
      this.NitsServices.AlertMsm(err.error.error)
    });
  }

  tiempoParametro(OTP) {
    const dataTiempoOtp = {
      cedulasociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      codigo: CryptoJS.AES.encrypt(OTP, this.Constants._secret).toString(),
      paso: "10",
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString() 
    }
    this.authService.ApiSendData(this.Constants._APIValidacionTransacciones, dataTiempoOtp).subscribe(data => {
      this.NitsServices.AlertMsm(`Se ha enviado el código para realizar el retiro, desde este momento tiene ${data[0].tiempoparametro} minutos de vigencia`);
      this.inicializarcarcampos();
    },
    err => {
      console.log(err)
    });
  }

  async Confirmar(){
    const alert = await this.alerCtrl.create({
     message: "El monto a retirar es " +
     "<br> $ " + (this.format(this.valorRetiro)) +
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
            this.Solicitar()
          }
        }
      ]
    });
   await alert.present();
  }

  inicializarcarcampos(){
    this.valorRetiro=""
    this.Total.Valor="0"
    this.ahorroSelect=""
    this.costotransaccion=""
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Estimado(a) asociado(a), <br>Queremos informarte que el valor a retirar incluirá automáticamente el cálculo del costo del GMF (Impuesto de Movimientos Financieros).',
      duration: 7000, // duración en milisegundos
      position: 'top', // posición en la pantalla
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Listo',
          role: 'cancel',
        },
      ],
    });
    
    await toast.present();
  }
}
