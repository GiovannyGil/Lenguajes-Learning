import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion-traslado-asociados',
  templateUrl: './inscripcion-traslado-asociados.page.html',
  styleUrls: ['./inscripcion-traslado-asociados.page.scss'],
})
export class InscripcionTrasladoAsociadosPage implements OnInit {
  numeroentidad = localStorage.getItem("numeroentidad")
  ahorros = []
  dataCode = {}
  ahorrosCedu = []
  params = {
    CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    Tipo: '',
    pagare: CryptoJS.AES.encrypt("0", this.Constants._secret).toString(),
    RegistroEmpezar: 0,
    RegistroMostrar: 10
  }
  myForm: FormGroup;
  valor
  saldoMinimo: any
  codigoValida: any
  dataCodigo: any
  dataInscripcion: any
  destinoahorros: any
  cuentaOrigenSelect: any
  cuentaDestinoSelect: any
  cedula
  cuentas
  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController,
    public router: Router
  ) {
    this.myForm = this.fb.group({
      cuentaOrigenSelect: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      cuentaDestinoSelect: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.AhorrosAV();
  }

  CuentasInscritas() {
    this.router.navigateByUrl('/cuentas-inscritas');
  }

  AhorrosAV() {
    let consultaAVparams = {
      cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      caso: 2
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIConsultaAVtrasladoahorros, consultaAVparams).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0].length === 0) {
        this.NitsServices.AlertMsm("No hay datos para mostrar");
        return;
      }
      this.ahorros = data[0].filter(item => item.estado == "A");
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  cuentastercero(cedulaTraslado) {
    if (cedulaTraslado === undefined || cedulaTraslado === '') {
      this.NitsServices.AlertMsm("Ingresa el número de cedula");
      return;
    }

    let consultaAVparams = {
      cedula: CryptoJS.AES.encrypt(cedulaTraslado.toString(), this.Constants._secret).toString(),
      caso: 2
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIConsultaAVtrasladoahorros, consultaAVparams).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      this.cuentaDestinoSelect = ""
      this.ahorrosCedu = []
      if (data[0].length === 0) {
        this.NitsServices.AlertMsm("No hay datos para mostrar");
        this.cuentaDestinoSelect = ""
        return;
      }
      
      this.ahorrosCedu = data[0]
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  convertNumber(data) {
    let data1 = data.detail.value.replace(/,/g, "")
    let data2 = data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.valor = data2
  }

  async Confirmar() {
    const alert = await this.alerCtrl.create({
      message: "¿Está seguro de agregar esta cuenta?",
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
            this.generarCodigo()
          }
        }
      ]
    });
    await alert.present();
  }

  inscribir() {
    let dataInscripcion = {
      idmatricula: null,
      cedulaorigen: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      codLineaOrigen: CryptoJS.AES.encrypt(this.cuentaOrigenSelect.codlinea, this.Constants._secret).toString(),
      cuentaOrigen: CryptoJS.AES.encrypt(this.cuentaOrigenSelect.numerocuenta, this.Constants._secret).toString(),
      cedulaDestino: this.cedula,
      codLineaDestino: CryptoJS.AES.encrypt(this.cuentaDestinoSelect.codlinea, this.Constants._secret).toString(),
      cuentaDestino: CryptoJS.AES.encrypt(this.cuentaDestinoSelect.numerocuenta, this.Constants._secret).toString(),
      canal: "APP",
      Estado: "P",
      accion: "N",
      agencia: localStorage.getItem("agenciaAso"),
      caso: 4
    }

    this.authService.ApiSendData(this.Constants._APIParamTrasladoAV, null).subscribe(data => {
      if (data[0][0].esenlinea.trim() === 'S') {
        dataInscripcion.Estado = 'A'
      }
      this.NitsServices.Cargando()
      this.authService.ApiSendData(this.Constants._APIInscripcionCuentaTraslado, dataInscripcion).subscribe(data => {
        this.NitsServices.CargandoDismiss()
        if (data[0][0].Respuesta === 1) {
          this.NitsServices.AlertMsm("Matricula agregada correctamente");
          this.inicializarcarcampos();
        } else if (data[0][0].response === 0) {
          this.NitsServices.AlertMsm("La cuenta a matricular ya existe");
          this.inicializarcarcampos();
        } else if (data[0][0].response === 1) {
          this.NitsServices.AlertMsm("Matricula agregada correctamente");
          this.inicializarcarcampos();
        }
      },
        err => {
          this.NitsServices.CargandoDismiss()
          this.NitsServices.AlertMsm("Error al crear la matricula");
          console.log(err)
        });
    },
    err => {
      console.log(err)
    })
  }

  inicializarcarcampos() {
    this.cuentaOrigenSelect = ""
    this.cuentaDestinoSelect = ""
    this.cedula = ""
  }

  DesencriptarDataAhorro(data) {
    var empieza = 0
    var cuantos = data[0].length
    if (data[0][0].NumeroCuenta != undefined) {
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

  generarCodigo(){
    if(this.cuentaOrigenSelect.codlinea === this.cuentaDestinoSelect.codlinea && this.cuentaOrigenSelect.numerocuenta.trim() === this.cuentaDestinoSelect.numerocuenta.trim()){
      this.NitsServices.AlertMsm("La cuenta a transferir no puede ser la misma a la origen, por favor seleccione otra");
      return;
    }  
    this.dataCode = {
      cedulasociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString()
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIGenerarCodigoMatricula, this.dataCode).subscribe((res: any) => {
      this.NitsServices.CargandoDismiss()
      this.dataCodigo = res.data
      if(res.Mensaje !== ""){
        this.AlertCodigo("Se ha enviado un codigo al celular registrado", this.dataCodigo)
      }
    },
      err => {
        this.NitsServices.AlertMsm("Error de conexión con el servidor")
        console.log(err);
      });
  }

  async AlertCodigo(message, code) {
    const alert = await this.alerCtrl.create({
      header: 'Matricula de cuenta',
      message: message,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        }, {
          text: 'ACEPTAR',
          handler: () => {
            this.VerificarCodigo(code)
          }
        }
      ]
    });
    await alert.present();
  }

  async VerificarCodigo(code) {
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
            this.codigoValida = data.codigo.replace(/ /g, "")
            if (this.codigoValida === code.valorcodigo) {
              this.inscribir()
              this.inicializarcarcampos()
            } else {
              this.NitsServices.AlertMsm("Codigo incorrecto")
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
