import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-retiros-gana',
  templateUrl: './retiros-gana.page.html',
  styleUrls: ['./retiros-gana.page.scss'],
})
export class RetirosGanaPage implements OnInit {
  myForm: FormGroup;
  ahorros: any
  ahorroSelected: any
  valor

  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController
  ) { 
      this.myForm = this.fb.group({
        ahorroSelected: ['', [Validators.required]],
        valor: ['', [Validators.required, Validators.pattern('[0-9-,]*'),Validators.minLength(1)]],
      })
  }

  ngOnInit() {
    var params={
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador:localStorage.getItem("esoperador"),
      MensajeError:"",
      NumeroError:"",
      Tipoerror:""
    }
    this.authService.ApiSendData(this.Constants._APIGANAconsultaAhorros, params).subscribe(data => {
      this.DesencriptarDataAhorro(data)
      this.ahorros=data[0]
    },
    err => {
      console.log(err)
    });
  }

  async Confirmar(){
    const alert = await this.alerCtrl.create({
     message: "El monto para la solicitud es <br>$ " +
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
            this.Solicitar()
            this.inicializarcarcampos()
            this.ngOnInit()
          }
        }
      ]
    });
   await alert.present();
  }

  Solicitar(){
    var paramettersolicitud={
      CedulaAsociado:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      NumeroCuentaOrigenTraslado:CryptoJS.AES.encrypt(this.ahorroSelected.NumeroCuenta, this.Constants._secret).toString(),
      LineaOrigenTraslado:this.ahorroSelected.Linea,
      AgenciaOrigenTraslado: this.ahorroSelected.Agencia,
      Valor:this.valor.replace(/,/g, "")
    }

    if (parseInt(paramettersolicitud.Valor) > this.ahorroSelected.Saldoretirar){
      this.NitsServices.AlertMsm('No cuentas con saldo disponible para el retiro');
      return
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIGANAMsj, paramettersolicitud).subscribe(data => {
      this.NitsServices.CargandoDismiss()
    
      this.NitsServices.mostrarMensajes(data) 
    },
    err => {
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
      data[0][empieza].NumeroCuenta = CryptoJS.enc.Utf8.stringify(NumeroCuenta);
      empieza++   
    }
  }
    return data
  }

  inicializarcarcampos(){
    this.valor=""
    this.ahorroSelected=""
  }

  convertNumber(data){
    var data1=data.detail.value.replace(/,/g, "")
    var data2=data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.valor=data2
  }


}
