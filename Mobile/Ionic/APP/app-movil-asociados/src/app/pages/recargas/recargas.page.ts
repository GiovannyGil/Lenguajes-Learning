import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.page.html',
  styleUrls: ['./recargas.page.scss'],
})
export class RecargasPage implements OnInit {
  myForm: FormGroup;
  texto='Número de celular:'
  Operador
  NumeroCelular
  ValorRecarga
  productoSelected: any
  productos: any
  typeProduct:any = {}

  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl:AlertController
  ) {
    this.myForm = this.fb.group({
      OperadorSelected: ['', [Validators.required]],
      NumeroCelular: ['', [Validators.required,Validators.minLength(1)]],
      ValorRecarga: ['', [Validators.required, Validators.pattern('[0-9]*'),Validators.minLength(1)]],
      productoSelected: ['', [Validators.required]]
    })
   }

  ngOnInit() {
    var param={
      cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    }
  this.authService.ApiSendData(this.Constants._APIconsultaparapagos, param).subscribe(data => {  
  this.productos=data[0]
      },
      err => {
        console.log(err)
       });
  }
  
  validarvalor(valor){
    if(valor < 1000){
      this.ValorRecarga=0
      this.NitsServices.AlertMsm("El operador no permite realizar recargas por este valor, Valor mínimo $1.000")
      return false;
    }
  }

  valordisponible(producto){
    this.ValorRecarga=producto.cupo
  }

  CambiarTexto(operador){
   if(operador==='DirectTv'){
     this.texto='Contrato:'
   }else{
     this.texto='Número de celular:'
   }
  }

  async ConfirmarPago(productos){
    const alert = await this.alerCtrl.create({
     message: "Se realizará recarga al Operador: " + (productos.Operador) +
      "<br> Número: " + (productos.NumeroCelular) + 
      "<br> Valor: " + (productos.ValorRecarga) +
      "<br> ¿Está seguro de realizar la recarga?",
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: data => {
            this.typeProduct={}
          }
        },
        {
          text: 'OK',
          handler: data => {
          this.Pagar(productos)
          this.typeProduct={}
          }
        }
      ]
    });
   await alert.present();
  }

  Pagar(productos){

      if (productos.NumeroCelular.length != 10 && productos.Operador != "DirectTv") {
           this.NitsServices.AlertMsm("El número de celular debe contener 10 digitos.");
           return;
      }
      else {
          if (productos.NumeroCelular.length != 12 && productos.Operador == "DirectTv") {
              this.NitsServices.AlertMsm("El número de Contrato debe contener 12 digitos.");
              return;
          }
      }
  
    this.authService.ApiSendData(this.Constants._APIconsultaconexionparapagos, '').subscribe(data => {  
     
      var parameterslogueo = {
        username: data[0][0].usuarioopa,
        password: data[0][0].contrasenaopa,
        channel: "IMoney"
      };

      console.log(parameterslogueo)
      this.authService.ApiSendData(this.Constants._APItraerTokeniimoneyopa, parameterslogueo).subscribe(datatoken => {  
        
       var now = new Date();
       var year = "" + now.getFullYear();
       var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        var day = "" + now.getDate();
        if (day.length == 1) {
            day = "0" + day;
        }
        var hour = "" + now.getHours();
        if (hour.length == 1) {
            hour = "0" + hour;
        }
        var minute = "" + now.getMinutes();
        if (minute.length == 1) {
            minute = "0" + minute;
        }
        var second = "" + now.getSeconds();
        if (second.length == 1) {
            second = "0" + second;
        }
        var today =
            year +
            "/" +
            month +
            "/" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second;

        var parametrostranopa={}

        if (productos.productoSelected.esrota == "S") {
            parametrostranopa = {
                topUpInformation: {
                    phone: productos.NumeroCelular,
                    operator: productos.Operador
                },
                ClientId: localStorage.getItem("operador"),
                Channel: "IMoney",
                Product: "Loan",
                Operation: "Withdraw",
                ProductReference: productos.productoSelected.cuenta,
                ProductType: productos.productoSelected.codlinea,
                ProductCode: productos.productoSelected.coddestino,
                TransactionDate: today,
                Cash: productos.ValorRecarga.toString(),
                Check: 0,
                ExternalPaymentReference: ""
            };
        } else {
            parametrostranopa = {
                topUpInformation: {
                    phone: productos.NumeroCelular,
                    operator: productos.Operador
                },
                ClientId: localStorage.getItem("operador"),
                Channel: "IMoney",
                Product: "Saving",
                Operation: "Withdraw",
                ProductReference: productos.productoSelected.cuenta,
                ProductType: "AhorroVista",
                ProductCode: productos.productoSelected.codlinea,
                TransactionDate: today,
                Cash: productos.ValorRecarga.toString(),
                Check: 0,
                ExternalPaymentReference: ""
            };
        }
        
       // console.log(JSON.stringify(parametrostranopa))
      // console.log(datatoken['token'])
        
        datatoken['parametrostranopa']=parametrostranopa;
        return
        this.authService.ApiSendDataImoney(this.Constants._APISolicitarRecarga, datatoken).subscribe(datacxc => {  
          if (datacxc['result'] == true) {
            var datacxc = datacxc['transactionId'];

                    this.NitsServices.AlertMsm("Código Confirmación Pago " +
                    "" +
                    datacxc +
                    "" +
                    " Su cuenta fue afectada");

        } else {
            var mensajes = "";

            if (datacxc['errors'].length == 1) {
                mensajes =
                    mensajes + datacxc['errors'][0].message;
            }
            if (datacxc['errors'].length == 2) {
                mensajes =
                    mensajes + datacxc['errors'][1].message;
            }
            if (datacxc['errors'].length == 3) {
                mensajes =
                    mensajes + datacxc['errors'][2].message;
            }
            
            if(mensajes != ""){
            this.NitsServices.AlertMsm(mensajes);
            }
        }
              });//termina _APISolicitarRecarga
            });//termina _APItraerTokeniimoneyopa
          });//termina _APIconsultaconexionparapagos
  }

}