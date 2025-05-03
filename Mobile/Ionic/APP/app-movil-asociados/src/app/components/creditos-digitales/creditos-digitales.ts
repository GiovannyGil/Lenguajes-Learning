import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {ConstantsService} from '../../servicios/constants.service';
import {AuthService} from '../../servicios/auth.service';
import {NitsService} from '../../servicios/nits.service';
import { HttpHeaders } from '@angular/common/http';

declare var cordova;

/**
 * Generated class for the CreditosDigitalesComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'creditos-digitales',
  templateUrl: 'creditos-digitales.html',
  styleUrls: ['./creditos-digitales.scss'],
})
export class CreditosDigitalesComponent implements OnInit {
  // configuracion de rutas api creditos digitales
  configuracion = {};
  // cuentas de ahorro a la vista para creditos digitales
  cuentasDeAhorros = [];
  // parametros para iniciar el preview
  creditosDigitalesParametros = {}
  // variable para identificar si tiene preaprobado
  tienePreaprobado: Boolean = false;
  // agregar en la pantalla el cargando para no permitir mover la app
  loading: any;

  esoperador = localStorage.getItem("esoperador")

  headers = new HttpHeaders()
  // mensaje de preaprobado
  mensajePreaprobado = ""

  constructor(
    private Constants: ConstantsService,
    private authService: AuthService,
    public nitsServices: NitsService
  ) {
    this.headers.append("Content-Type", "application/json")
    this.headers.append("authorization", localStorage.getItem("Auth"))
  }

  ngOnInit() {
    this.nitsServices.Cargando()
    this.iniciarCreditosDigitales()
  }

  iniciarCreditosDigitales() {
    this.obtenerConfiguracion()
  }

  obtenerConfiguracion() {
    return this.authService.ApiSendData(this.Constants._APICreditoConfig, { esoperador: this.esoperador })
    .subscribe(
      data => {
        this.configuracion = data[0] || {}
        return this.obtenerToken()
      },
      err => {
        this.nitsServices.CargandoDismiss()
        console.log(err)
      }
    );
  }

  obtenerToken() {
    return this.authService.ApiSendData(this.Constants._APICreditoToken, { esoperador: this.esoperador })
    .subscribe(
      data => {
        this.configuracion['token'] = data[0].token
        return this.obtenerCuentasDeAhorros();
      },
      err => {
        this.nitsServices.CargandoDismiss()
        console.log(err)
      }
    );
  }

  obtenerCuentasDeAhorros() {
    const parametters = {
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      MensajeError: "",
      NumeroError: "",
      Tipoerror: "",
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador"),
    };

    this.authService.ApiSendData(this.Constants._APIOrigenahorros, parametters).subscribe(data => {

      if (data[0][0].Codigo != undefined) {
        if (data[0][0].Codigo == "401") {
          this.nitsServices.mostrarMensajes(data)
          return localStorage.clear()
        } else if (data[0][0].Codigo == "404") {
          this.nitsServices.CargandoDismiss()
          return // no tiene lineas matriculadas para realizar traslados
          // this.nitsServices.mostrarMensajes(data)

        }
      }

      let cuentasDeAhorros = this.DesencriptarDataAhorro(data)

      cuentasDeAhorros = cuentasDeAhorros[0].filter(cuenta => cuenta.Linea);

      if (cuentasDeAhorros.length <= 0) {
        return;
      }

      cuentasDeAhorros = cuentasDeAhorros.map( cuenta => {
        return `${cuenta.Linea}-${cuenta.NumeroCuenta.trim()}`
      });

      this.cuentasDeAhorros = cuentasDeAhorros
      this.recuperarCupo()
    },
    err => {
      console.log(err);
      this.nitsServices.CargandoDismiss()
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

  recuperarCupo() {
    try {
      cordova.plugins.DigitalCreditPlugin.getAmountMethod(
        {
          config: this.configuracion,
          userIdentifitation: localStorage.getItem("operador")
        },
        (response) => {
          this.nitsServices.CargandoDismiss()
          try {
            var res = JSON.parse(response);

            if (res.object) {
              this.tienePreaprobado = true;
              var cupoFormateado = new Intl.NumberFormat("de-DE").format(res.object.creditAmount)
              this.mensajePreaprobado = "Está listo para ti un crédito aprobado por: $" + cupoFormateado;
              this.creditosDigitalesParametros = res.object;
            } else {
              this.tienePreaprobado = false;
            }
          } catch (error) {
            this.tienePreaprobado = false;
          }
        }, (error) => {
          this.tienePreaprobado = false;
          console.log(error);
          this.nitsServices.CargandoDismiss()
        });
    } catch (error) {
      this.tienePreaprobado = false;
      this.nitsServices.CargandoDismiss()
    }
  }

  iniciarPreview() {
    cordova.plugins.DigitalCreditPlugin.previewMethod(
      {
          config: this.configuracion,
          digitalCreditParams: this.creditosDigitalesParametros,
          creditosDigitalesCuentas: this.cuentasDeAhorros
      },
      (response) => {
          if (response == 'finalizado') {
            this.tienePreaprobado = false;
            this.mensajePreaprobado = ""
          }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
