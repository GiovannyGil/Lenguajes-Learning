import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';
import * as CryptoJS from 'crypto-js'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-creacion-ahorros-fecsa',
  templateUrl: './creacion-ahorros-fecsa.page.html',
  styleUrls: ['./creacion-ahorros-fecsa.page.scss'],
})
export class CreacionAhorrosFecsaPage implements OnInit {
myForm: FormGroup;
parametros
datoscliente: {
  nombreintegrado?: string;
  quehace?: string;
  numerocuenta?: string;
  formapago?: string;
  cuota?: string;
  Plazo?: string;
} = {}
Linea1: {
  Nombre?: string;
  tipo?: string;
  codlinea?: string;
} = {}

Linea: {
  Nombre?: string;
  tipo?: string;
  codlinea?: string;
} = {}

cuentas=[]
select=[]
habilitatipo
habilita
deshabilita
descripcion

  constructor(
    public router: Router,
    private Constants: ConstantsService,
    private authService: AuthService,
    public  NitsServices: NitsService,
    public fb: FormBuilder,
    public alerCtrl: AlertController
  ) {
    this.myForm = this.fb.group({
      tipoSolicitudSelected: ['', [Validators.required]],
      Linea: [''],
      Cuenta: ['', [Validators.required]],
      pagoSelected: ['', [Validators.required]],
      Cuota: ['', [Validators.required,Validators.minLength(1)]],
      plazoSelected:  [''],
    })

    this.parametros=this.router.getCurrentNavigation().extras.queryParams
    this.descripcion=this.parametros.descripcion
  }

  ngOnInit() {
    this.NitsServices.AlertMsm(this.parametros.Mensaje)
    var paratraerdatos={
      params:{cedula: this.parametros.cedula,
      idporta: this.parametros.id
      }
    }

    this.authService.ApiSendData(this.Constants._APItraerdatoscreacionahofecsa, paratraerdatos).subscribe(data => {
      this.datoscliente = data[1][0];
      this.Linea1 = data[0][0];
      this.cuentas = data[2];
      this.Linea = this.Linea1

      this.DesencriptarDatosCliente(this.datoscliente)
      this.DesencriptarDatosLinea1(this.Linea1)
      this.DesencriptarDatosCuentas(this.cuentas)

      this.datoscliente['codlinea'] = this.Linea1
      if (this.Linea['tipo'] == 'AC') {
          this.habilitatipo = true
      } else {
          this.habilitatipo = false
      }

  },
    error => {
      console.log(JSON.stringify(error));
    });

  }

  async ConfirmarEnvio(){
    const alert = await this.alerCtrl.create({
     message: "¿Está seguro de hacer esta operación?",
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: data => {
            this.select['cuentas'] = {}
            this.datoscliente['formapago'] = ""
            this.datoscliente['cuota'] = ""
            this.datoscliente['Plazo'] = ""
            this.datoscliente['numerocuenta'] = ""
          }
        },
        {
          text: 'OK',
          handler: data => {
          this.Enviar()
          }
        }
      ]
    });
   await alert.present();
  }

  Enviar(){
    if (this.datoscliente['quehace'] == "M"){
      this.datoscliente['numerocuenta'] =  this.datoscliente['numerocuenta']
    }
    var paramettersCreation={
      params: this.datoscliente
    }

    this.authService.ApiSendData(this.Constants._APIcrearsolicitud, paramettersCreation).subscribe(data => {
      this.NitsServices.mostrarMensajes(data)
      this.select['cuentas'] = {}
      this.datoscliente['formapago'] = ""
      this.datoscliente['cuota'] = ""
      this.datoscliente['Plazo'] = ""
      this.datoscliente['numerocuenta'] = ""
  },
    error => {
      console.log(JSON.stringify(error));
    });
  }

  pintardatos(quehace){
    this.select['cuentas'] = [];

            if (this.datoscliente['quehace'] == "M") {
                this.habilita = true
                this.deshabilita = false

            } else {
                this.habilita = false
                this.deshabilita = true
            }

            if (quehace == "M") {
                var comienza = 0
                var termina = this.cuentas.length
                var tipo = this.Linea1['tipo']
                var linea = this.Linea1['codlinea']

                while (comienza >= 0 && comienza < termina) {

                    if (this.cuentas[comienza].tipoaporte === tipo && this.cuentas[comienza].codigo === linea) {
                        this.select['cuentas'].push(this.cuentas[comienza])
                    }

                    comienza++
                }
                this.Linea = this.Linea1
            } else {

                this.select['cuentas'] = {}
                this.datoscliente['formapago'] = ""
                this.datoscliente['cuota'] = ""
                this.datoscliente['Plazo'] = ""
                this.datoscliente['numerocuenta'] = ""
            }
  }

  Datoscuenta(cuenta){
    var comienza = 0
            var termina = this.cuentas.length
            this.datoscliente['formapago'] = ""
            this.datoscliente['cuota'] = ""
            this.datoscliente['Plazo'] = ""
            while (comienza >= 0 && comienza < termina) {

                if (this.cuentas[comienza].numerocuenta == cuenta.numerocuenta && this.cuentas[comienza].idahorros == cuenta.idahorros) {
                    this.datoscliente['formapago'] = this.cuentas[comienza].formapago
                    this.datoscliente['cuota'] = this.cuentas[comienza].valorcuota
                    this.datoscliente['Plazo'] = this.cuentas[comienza].plazo
                }

                comienza++
            }
  }


  DesencriptarDatosCliente(data){
if(data.cedula!=undefined){
        var cedula = CryptoJS.AES.decrypt(
          data.cedula,
          this.Constants._secret
      );
      var celular = CryptoJS.AES.decrypt(
          data.celular,
          this.Constants._secret
      );
      var email = CryptoJS.AES.decrypt(
          data.email,
          this.Constants._secret
      );
      var nombreciudad = CryptoJS.AES.decrypt(
        data.nombreciudad,
        this.Constants._secret
      );
      var nombreempresa = CryptoJS.AES.decrypt(
        data.nombreempresa,
        this.Constants._secret
     );
     var nombreintegrado = CryptoJS.AES.decrypt(
      data.nombreintegrado,
      this.Constants._secret
     );
      data.cedula = CryptoJS.enc.Utf8.stringify(cedula);
      data.celular = CryptoJS.enc.Utf8.stringify(celular);
      data.email = CryptoJS.enc.Utf8.stringify(email);
      data.nombreciudad = CryptoJS.enc.Utf8.stringify(nombreciudad);
      data.nombreempresa = CryptoJS.enc.Utf8.stringify(nombreempresa);
      data.nombreintegrado = CryptoJS.enc.Utf8.stringify(nombreintegrado);

  }
    return data
  }

  DesencriptarDatosLinea1(data){
    if(data.Nombre!=undefined){
            var Nombre = CryptoJS.AES.decrypt(
              data.Nombre,
              this.Constants._secret
          );
          var correo = CryptoJS.AES.decrypt(
              data.correo,
              this.Constants._secret
          );
          var tipo = CryptoJS.AES.decrypt(
              data.tipo,
              this.Constants._secret
          );

          data.Nombre = CryptoJS.enc.Utf8.stringify(Nombre);
          data.correo = CryptoJS.enc.Utf8.stringify(correo);
          data.tipo = CryptoJS.enc.Utf8.stringify(tipo);
      }
        return data
      }

      DesencriptarDatosCuentas(data){
        var empieza = 0
        var cuantos = data.length
        if(data[0].formapago!=undefined){
          while (empieza >= 0 && empieza < cuantos) {
                var formapago = CryptoJS.AES.decrypt(
                  data[empieza].formapago,
                  this.Constants._secret
              );
              var numerocuenta = CryptoJS.AES.decrypt(
                  data[empieza].numerocuenta,
                  this.Constants._secret
              );
              var tipoaporte = CryptoJS.AES.decrypt(
                  data[empieza].tipoaporte,
                  this.Constants._secret
              );

              data[empieza].formapago = CryptoJS.enc.Utf8.stringify(formapago);
              data[empieza].numerocuenta = CryptoJS.enc.Utf8.stringify(numerocuenta).trim();
              data[empieza].tipoaporte = CryptoJS.enc.Utf8.stringify(tipoaporte);
              empieza++
          }
        }
            return data
          }

          convertNumber(data){
            var data1=data.detail.value.replace(/,/g, "")
            var data2=data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            this.datoscliente['cuota']=data2
          }

}
