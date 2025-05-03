import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js'
import { Device } from '@ionic-native/device/ngx';
import { ConstantsService } from '../../servicios/constants.service';
import { AuthService } from '../../servicios/auth.service';
import { NitsService } from '../../servicios/nits.service'
import { EventsService } from '../../servicios/events.service'

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {
  myForm: FormGroup;
  qrData = {
    esoperador: "",
    operador: ""
  };
  UUID = {}
  logueousuario = { Proceso: "" }
  numeroproceso
  procesoactivo: any = [];
  ingreso = null
  nombrecompania = { nombrecompania: "", }
  cordenadas = []
  mensajeCodigo: any
  codigoIngreso
  respuestaCodigo
  paramettersCodigoRecuperaClave = {}
  numeroentidad
  logoinicio

  constructor(public fb: FormBuilder,
    private Constants: ConstantsService,
    private authService: AuthService,
    public NitsServices: NitsService,
    public events: EventsService,
    public router: Router,
    public alerCtrl: AlertController,
    public device: Device
  ) {
    localStorage.clear()//limpiar el localstorage cuando carga
    this.myForm = this.fb.group({
      Usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  ngOnInit() {
    // // Verificar si el servicio está disponible
    // const servicioDisponible = true; // Aquí debes implementar la lógica real para verificar la disponibilidad del servicio

    // if (!servicioDisponible) {
    //   this.router.navigate(['/not-found']);
    // }

    this.events.subscribe('numeroentidad-menu', (param) => {//Evento recibido
      this.numeroentidad = param;
      //cargar logos al inicio
      if (this.numeroentidad == '0015') {
        this.logoinicio = "assets/imgs/logos/logo-banafe.png"
      } else if (this.numeroentidad == '0432') {
        this.logoinicio = "assets/imgs/logos/logo-semillasfec.png"
      } else if (this.numeroentidad == '0091') {
        this.logoinicio = "assets/imgs/logos/logo-riachon.jpg"
      } else if (this.numeroentidad == "0045") {
        this.logoinicio = 'assets/imgs/logos/LogoCPIO2.png'
      } else if (this.numeroentidad == "0127") {
        this.logoinicio = 'assets/imgs/logos/logo-galeria.png'
      } else if (this.numeroentidad == "0321") {
        this.logoinicio = 'assets/imgs/logos/logo-fonducar.jpg'
      } else if (this.numeroentidad == "0180") {
        this.logoinicio = 'assets/imgs/logos/Logo-Femfuturo-APP-1.jpg'
      } else if (this.numeroentidad == "0193") {
        this.logoinicio = 'assets/imgs/logos/logo-fecom2.jpg'
      } else if (this.numeroentidad == "0046") {
        this.logoinicio = 'assets/imgs/logos/logo-canapro.png'
      } else if (this.numeroentidad == "0048") {
        this.logoinicio = 'assets/imgs/logos/logo-forjar-header.png'
      } else if (this.numeroentidad == "0050") {
        this.logoinicio = 'assets/imgs/logos/logo-cooptenjo.jpg'
      } else if (this.numeroentidad == "0052") {
        this.logoinicio = 'assets/imgs/logos/logo-coonfie2.jpg'
      } else if (this.numeroentidad == "0419") {
        this.logoinicio = 'assets/imgs/logos/Dotakondor.jpg'
      } else if (this.numeroentidad == "0032") {
        this.logoinicio = 'assets/imgs/logos/logo-guatape.jpg'
      } else {
        this.logoinicio = "assets/imgs/logos/opa2-img.png"
      }




      //carga logueo con usuario
      if (this.numeroentidad == '0052') {
        this.numeroproceso = 'RA00055407'
      } else if (this.numeroentidad == '0050') {
        this.numeroproceso = 'RA00052368'
      } else {
        this.numeroproceso = 'RA00044960'
      }
      this.logueousuario.Proceso = CryptoJS.AES.encrypt(this.numeroproceso, this.Constants._secret).toString()
      this.qrData.esoperador = "N"
      this.NitsServices.Cargando()
      this.authService.ApiSendData(this.Constants._APIValidarProcesos, this.logueousuario).subscribe(data => {
        this.NitsServices.CargandoDismiss()
        this.procesoactivo = data[0].procesoactivo;
      },
        err => {
          console.log(err)
          // IR A NOT-FOUND
          // this.router.navigate(['/not-found']);

        });

      this.authService.ApiSendData(this.Constants._APIPublicidad, { esoperador: "N" }).subscribe(data => {
        this.nombrecompania = data[5][0].nombrecompania

      },
        err => {
          this.NitsServices.CargandoDismiss()
          console.log(err)
        })
    });//termina el evento
  }

  //PRINCIPAL
  validar() {
    // debugger;
    var qrData2 = {
      nuevousuario: CryptoJS.AES.encrypt(this.qrData.operador, this.Constants._secret).toString()
    }
    this.qrData.operador = ""
    this.authService.ApiSendData(this.Constants._APIconsultacedulausuario, qrData2).subscribe(res => {
      var cedula = CryptoJS.AES.decrypt(
        res[0][0].cedula,
        this.Constants._secret
      );
      console.error(res)
      res[0][0].cedula = CryptoJS.enc.Utf8.stringify(cedula);

      cedula = res[0][0].cedula

      if (cedula == "0") {
        this.NitsServices.AlertMsm("El usuario no existe, por favor verifique...")
        return
      }
      this.confirmarLogin(cedula)
    },
      err => {
        this.NitsServices.AlertMsm("Error de conexión con el servidor")
        console.log(err);
      });
  }

  confirmarLogin(cedula) {
    let operador = cedula
    localStorage.setItem("operador", operador);
    let esoperador = this.qrData.esoperador
    localStorage.setItem("esoperador", esoperador);

    this.UUID = {
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador"),
      //uuid: CryptoJS.AES.encrypt("136", this.Constants._secret).toString(),
      uuid: CryptoJS.AES.encrypt(this.device.uuid, this.Constants._secret).toString(),
    }
    this.uuid()
    //this.validarusuario()
  }

  uuid() {
    this.qrData.operador = ""
    this.authService.ApiSendData(this.Constants._APIvalidarUUID, this.UUID).subscribe(res => {
      if (res[0].Mensaje !== "") {
        this.AlertRegistro(res[0].Mensaje)
      } else {
        this.validarusuario()
      }
    },
      err => {
        this.NitsServices.AlertMsm("Error de conexión con el servidor")
        console.log(err);
      });
  }

  validacionregistroUUID(parametter) {
    this.paramettersCodigoRecuperaClave = {
      Tipo: parametter,
      Operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      codigo: CryptoJS.AES.encrypt(this.codigoIngreso, this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador")
    }

    this.authService.ApiSendData(this.Constants._APIvalidacionregistroUUID, this.paramettersCodigoRecuperaClave).subscribe(resp => {
      if (resp[0][0].Codigo != undefined) { this.respuestaCodigo = resp[0][0].Codigo.replace(/ /g, "") }

      if (this.respuestaCodigo == "126") {
        this.NitsServices.mostrarMensajes(resp)
        return
      }

      if (this.respuestaCodigo == "128") {
        var Mensaje = CryptoJS.AES.decrypt(
          resp[0][0].Mensaje,
          this.Constants._secret
        );
        resp[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(Mensaje);
        this.AlertMsmcodigo(resp[0][0].Mensaje, "registro_uuid");
      }

      if (this.respuestaCodigo == "130") {
        this.NitsServices.mostrarMensajes(resp)
      }

      if (this.respuestaCodigo == "131") {
        this.guardarUUID()
        this.NitsServices.mostrarMensajes(resp)
      }

    }, err => {
      console.log(err)
    });
  }

  guardarUUID() {
    this.authService.ApiSendData(this.Constants._APIguardarUUID, this.UUID).subscribe(resp => {
      if (resp[0][0].Codigo != undefined) { this.respuestaCodigo = resp[0][0].Codigo.replace(/ /g, "") }

      setTimeout(() => {
        this.validarusuario()
      }, 2000);

    }, err => {
      console.log(err)
    });
  }

  validarusuario() {
    var qrData2 = {
      operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador: localStorage.getItem("esoperador")
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIValidarusuario, qrData2).subscribe(res => {
      this.NitsServices.CargandoDismiss()
      //desencripto datos

      var Codigo = CryptoJS.AES.decrypt(
        res[0][0].Codigo,
        this.Constants._secret
      );
      res[0][0].Codigo = CryptoJS.enc.Utf8.stringify(Codigo);

      var politicatratadatos = CryptoJS.AES.decrypt(
        res[0][0].politicatratadatos,
        this.Constants._secret
      );
      res[0][0].politicatratadatos = CryptoJS.enc.Utf8.stringify(politicatratadatos);

      this.politicatratamientodatos(res)//Muestra mensaje con politica tratamiento de datos

      if (res[0][0].Codigo) {
        this.ingreso = res[0][0].Codigo.replace(/ /g, "")
      } else {
        this.ingreso = '000'
      }

      if (this.ingreso == '819') {
        this.validacionrecuperacion("Genera")
      } else if (this.ingreso == '853') {
        this.router.navigateByUrl('/confirmar-login', { queryParams: { isCode: true, data: res[0][0] } })
      } else if (this.ingreso == '000') {
        this.router.navigateByUrl('/confirmar-login', { queryParams: { isCode: false, data: res[0][0] } })
      }

      if (this.ingreso != '000' && this.ingreso != '819') {
        this.NitsServices.mostrarMensajes(res)
        return this.ingreso
      }
    },
      err => {
        this.NitsServices.AlertMsm("Error de conexión con el servidor")
        this.NitsServices.CargandoDismiss()
        console.log(err);
      });
  }


  //Genera y valida el codigo para la recuperacion de la clave cuando el ingreso es por primera vez
  validacionrecuperacion(parametter) {
    this.paramettersCodigoRecuperaClave = {
      Tipo: parametter,
      esoperador: localStorage.getItem("esoperador"),
      Operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      codigo: CryptoJS.AES.encrypt(this.codigoIngreso, this.Constants._secret).toString()
    }
    this.authService.ApiSendData(this.Constants._APIValidacionesRecuperacion, this.paramettersCodigoRecuperaClave).subscribe(resp => {

      this.respuestaCodigo = resp[0][0].Codigo.replace(/ /g, "")

      if (this.respuestaCodigo == "126") {
        this.NitsServices.mostrarMensajes(resp)
        return
      }

      //desencripto datos
      var Mensaje = CryptoJS.AES.decrypt(
        resp[0][0].Mensaje,
        this.Constants._secret
      );
      resp[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(Mensaje);


      if (this.respuestaCodigo == "128") {
        this.AlertMsmcodigo(resp[0][0].Mensaje, "recuperacion");
      } else if (this.respuestaCodigo == "131") {
        this.router.navigateByUrl('/recuperacion-clave')
      }
      else {
        this.NitsServices.mostrarMensajes(resp)
      }
    }, err => {
      console.log(err)
    });
  }

  GuardaPoliticatratadatos(param) {
    var parametter = {
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      acepta: param
    }
    this.authService.ApiSendData(this.Constants._APIGuardaPoliticatratadatos, parametter).subscribe(res => {

    }, err => {
      console.log(err)
    });
  }


  async AlertRegistro(Message) {
    const alert = await this.alerCtrl.create({
      header: 'Registro de Dispositivo',
      message: Message,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: (data) => {
            this.NitsServices.AlertMsm("Para poder ingresar debe registrar el dispositivo")
          }
        }, {
          text: 'ACEPTAR',
          handler: () => {
            this.validacionregistroUUID("Genera")
          }
        }
      ]
    });
    await alert.present();
  }

  async AlertMsmcodigo(Message, pedirCodigo) {
    const alert = await this.alerCtrl.create({
      header: 'Registro de Dispositivo',
      message: Message,
      buttons: ['OK']
    });
    console.log(pedirCodigo)
    await alert.present();
    await alert.onDidDismiss();
    if (pedirCodigo == "recuperacion") {
      this.VerificarCodigo("recuperacion")
    }
    if (pedirCodigo == "registro_uuid") {
      this.VerificarCodigo("registro_uuid")
    }
  }

  async VerificarCodigo(quehace) {
    const alert = await this.alerCtrl.create({
      header: 'Código de verificación',
      inputs: [
        {
          name: 'codigo',
          placeholder: 'Código'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: (data) => {
            this.codigoIngreso = data.codigo.replace(/ /g, "")
            if (this.codigoIngreso) {
              if (quehace == "recuperacion") {
                this.validacionrecuperacion("Valida");
              }
              if (quehace == "registro_uuid") {
                this.validacionregistroUUID("Valida")
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async politicatratamientodatos(data) {
    var acepta = ''
    if (data[0][0].politicatratadatos !== "") {
      const alert = await this.alerCtrl.create({
        header: 'Política Tratamiento de Datos',
        message: data[0][0].politicatratadatos,
        buttons: [
          {
            text: 'No Acepto',
            role: 'cancel',
            handler: () => {
              acepta = 'N'
              this.GuardaPoliticatratadatos(acepta);
            }
          }, {
            text: 'Acepto',
            handler: () => {
              acepta = 'S'
              this.GuardaPoliticatratadatos(acepta);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async AcercaDe() {
    const alert = await this.alerCtrl.create({
      //header: "<div><img src='assets/icon/icone-information.png' style='widht:40px'><div>",
      message: "Diseño y Desarrollo <a href='https://www.opa.com.co'>OPA S.A.S.</a>",
      buttons: ['OK']
    });
    await alert.present();
  }

}
