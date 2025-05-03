import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traslado-otros-asociados',
  templateUrl: './traslado-otros-asociados.page.html',
  styleUrls: ['./traslado-otros-asociados.page.scss'],
})
export class TrasladoOtrosAsociadosPage implements OnInit {
  myForm: FormGroup;
  valor
  paramsAV = {
    CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    Tipo: CryptoJS.AES.encrypt("AHORRO", this.Constants._secret).toString(),
    pagare: CryptoJS.AES.encrypt("0", this.Constants._secret).toString(),
    RegistroEmpezar: 0,
    RegistroMostrar: 10
  }
  infoAhorro
  agenciaDestino
  params: any
  cuentasMatriculadas: any
  cuentasMatriculadasSelect: any
  cedula
  dataCode
  resultTransaccion : any
  valorRetiroDisponible
  saldoTotalCuenta
  constructor(
    public fb: FormBuilder,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public alerCtrl: AlertController,
    public router: Router
  ) {
    this.myForm = this.fb.group({
      cuentasMatriculadasSelect: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    })
   }

  ngOnInit() {
    this.cuentasInscritas()
  }

  cuentasInscritas() {
    this.params = {
      idmatricula: null,
      accion: 'C'
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIBuscarCuentaTraslado, this.params).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      this.cuentasMatriculadas = data[0].filter(item => item.Estado === "A" && item.cedulaOrigen === localStorage.getItem("operador") && item.canal != 'WEB');
      if (this.cuentasMatriculadas.length === 0){
        this.NitsServices.AlertMsm("No tienes ninguna cuenta matriculada")
      }
    },
    err => {
      console.log(err)
    });
  }
  
  validarSaldo() {
    if (parseFloat(this.valor.replace(/,/g, '')) > this.valorRetiroDisponible) {
      this.NitsServices.AlertMsm("El valor ingresado es mayor al disponible, verifique");
      return;
    }
   let lineaOrigen = this.cuentasMatriculadasSelect.codLineaOrigen
   let ahorroParam = { codlinea: lineaOrigen }
   this.cuentasMatriculadasSelect.valTransferir = parseFloat(this.valor.replace(/,/g, ''))
   // consulta de ahorros
   this.NitsServices.Cargando()
   this.authService.ApiSendData(this.Constants._APIEstadodecuentas, this.paramsAV).subscribe(data => {
    this.NitsServices.CargandoDismiss()
    this.infoAhorro = data[0].filter(item => item.Tipo == "AV" && item.Linea === lineaOrigen);
    // parametros de ahorros para validar saldo minimo
    this.authService.ApiSendData(this.Constants._APIParametrosAhorrosTraslado, ahorroParam).subscribe(data => {
      let saldoMinimo = data[0][0].saldominimocuenta
      if (parseFloat(this.valor.replace(/,/g, '')) > parseFloat(this.infoAhorro[0].SaldoTotalCuenta.replace(/,/g, ''))) {
        this.NitsServices.AlertMsm("El valor ingresado es mayor al disponible, verifique");
        return;
      }
      if (parseFloat(this.infoAhorro[0].SaldoTotalCuenta.replace(/,/g, '')) - parseFloat(this.valor.replace(/,/g, '')) < saldoMinimo) {
        this.NitsServices.AlertMsm("La cuenta no puede quedar con un valor inferior al minimo parametrizado");
        return;
      }
      this.validarCuentasOrigen()
      },
      err => { 
        this.NitsServices.CargandoDismiss()
        this.NitsServices.AlertMsm("Ocurrio un error");
        console.log(err, 'validar saldo minimo') 
      })
    },
    err => {
      this.NitsServices.CargandoDismiss()
      this.NitsServices.AlertMsm("Ocurrio un error");
      console.log(err, 'consulta ahorros')
    });
  }

  validarCuentasDestino () {
    let consultaAVparams = {
      cedula: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cedulaDestino.toString(), this.Constants._secret).toString(),
      caso: 2
    }

    this.authService.ApiSendData(this.Constants._APIConsultaAVtrasladoahorros, consultaAVparams).subscribe(data => {
      this.agenciaDestino = data[0].filter(item => item.numerocuenta.trim() == this.cuentasMatriculadasSelect.cuentaDestino.trim() && item.codlinea === this.cuentasMatriculadasSelect.codLineaDestino);
      if (this.agenciaDestino.length === 0 ) {
        this.NitsServices.AlertMsm("Se ha producido un error al procesar la transacción. Le recomendamos verificar el estado de las cuentas para asegurarse de que no se encuentren en estado cancelado.");
        return;
      } else {
        localStorage.setItem("agenciaDestino", this.agenciaDestino[0].agencia);
      }
      this.generarOPT()
    },
      err => {
        this.NitsServices.CargandoDismiss()
        this.NitsServices.AlertMsm("Error en validacion");
        console.log(err, 'Error en cuenta destino')
      });
  }
  
  validarCuentasOrigen () {
    let consultaAVparams = {
      cedula: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cedulaOrigen.toString(), this.Constants._secret).toString(),
      caso: 2
    }

    this.authService.ApiSendData(this.Constants._APIConsultaAVtrasladoahorros, consultaAVparams).subscribe(data => {
      this.agenciaDestino = data[0].filter(
        item => item.numerocuenta.trim() === this.cuentasMatriculadasSelect.cuentaOrigen.trim()
         &&     item.codlinea === this.cuentasMatriculadasSelect.codLineaOrigen);
      if (this.agenciaDestino.length === 0 ) {
        this.NitsServices.AlertMsm("Se ha producido un error al procesar la transacción. Le recomendamos verificar el estado de las cuentas para asegurarse de que no se encuentren en estado cancelado.");
        return
      } else {
        this.validarCuentasDestino()
      }
    },
      err => {
        this.NitsServices.CargandoDismiss()
        this.NitsServices.AlertMsm("Error en validacion");
        console.log(err, 'Error en cuenta origen')
      });
  }

  generarOPT(){
    this.dataCode = {
      cedulasociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString()
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIGenerarCodigoMatricula, this.dataCode).subscribe((res: any) => {
      this.NitsServices.CargandoDismiss()
      let dataCodigo = res.data
      if(res.Mensaje !== ""){
        // console.log(dataCodigo.valorcodigo)
        // console.log(CryptoJS.AES.decrypt(dataCodigo.valorcodigo, this.Constants._secret))
        // console.log(CryptoJS.enc.Utf8.stringify(dataCodigo.valorcodigo))
        this.AlertCodigo("Se ha enviado un codigo al celular registrado, tienes 3 intentos", dataCodigo)
      }
    },
      err => {
        this.NitsServices.AlertMsm("Error de conexión con el servidor")
        console.log(err);
      });
  }

  async AlertCodigo(mensaje, codigo) {
    const alert = await this.alerCtrl.create({
      header: 'Traslado de ahorros',
      message: mensaje,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: data => {
            this.inicializarcarcampos()
          }
        }, {
          text: 'ACEPTAR',
          handler: () => {
            this.validarCodigo(codigo, 1)
          }
        }
      ]
    });
    await alert.present();
  }

  async validarCodigo(code, intentos) {
    
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
          handler: async (data) => {
            const inputCodigo = alert.getElementsByTagName('input')[0];
            let codigoValida = data.codigo.replace(/ /g, "")
            if (codigoValida === code.valorcodigo) {
              this.realizarTransaccion(code);
            } else {
              if (intentos == 3) {
                this.NitsServices.AlertMsm('Has agotado tus 3 intentos. Inténtalo nuevamente.');
                this.inicializarcarcampos()
                return;
              } 
              const alert = await this.alerCtrl.create({
                header: 'Traslado de ahorros',
                message: 'Codigo incorrecto, ¿deseas intentarlo nuevamente?',
                buttons: [
                  {
                    text: 'CANCELAR',
                    role: 'cancel',
                    handler: data => {
                      this.inicializarcarcampos()
                    }
                    
                  }, {
                    text: 'ACEPTAR',
                    handler: async () => {
                      if (inputCodigo) inputCodigo.value = '';
                      this.alerCtrl.dismiss()
                      await this.validarCodigo(code, intentos + 1)
                    }
                  }
                ]
              });
              await alert.present();

            } 
          }
        }
      ]
    });
    await alert.present();
  }

  realizarTransaccion(dataMail) {
    this.authService.ApiSendData(this.Constants._APIParamTrasladoAV, null).subscribe(data => {
      if (data[0][0].esenlinea.trim() === 'S') {
        this.transaccionEsEnLinea(dataMail)
      } else {
        this.transaccionNoEsEnLinea()
      }
    },
    err => {
      console.log(err)
    });
  }

  transaccionEsEnLinea(dataMail){
    // BROKER
    const dataBrokerConsig = {
      nombre: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.nombreDestino, this.Constants._secret).toString(),
      clientId: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cedulaDestino, this.Constants._secret).toString(), // CEDULA ASOCIADO
      productReference: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cuentaDestino, this.Constants._secret).toString(), // NUMERO DE CUENTA
      productCode: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.codLineaDestino, this.Constants._secret).toString(), //  
      cash: this.cuentasMatriculadasSelect.valTransferir, // VALOR TRANSACCION
    }
    const dataBrokerRetiro = {
      clientId: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cedulaOrigen, this.Constants._secret).toString(), // CEDULA ASOCIADO
      productReference: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cuentaOrigen, this.Constants._secret).toString(), // NUMERO DE CUENTA
      productCode: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.codLineaOrigen, this.Constants._secret).toString(), //  
      cash: this.cuentasMatriculadasSelect.valTransferir, // VALOR TRANSACCION
    }
    const paramsBroker = {
      consigna: dataBrokerConsig,
      retiro: dataBrokerRetiro,
      mail: dataMail
    }

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APITransaccionBroker, paramsBroker).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      this.resultTransaccion = data
      if (this.resultTransaccion[0].result === true && this.resultTransaccion[1].result === true) {
        this.NitsServices.AlertMsm("Transaccion realizada correctamente")
        this.inicializarcarcampos()
      } else {
        this.NitsServices.AlertMsm("Ocurrio un error en la transaccion, intentalo nuevamente")
      }
    },
    err => {
      this.NitsServices.AlertMsm("Error de conexión con el servidor")
      console.log(err)
    });
  }

  transaccionNoEsEnLinea(){
    // ENVIAR A INTEGRADOR 
    const dataTran = {
      cedulaOrigen: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cedulaOrigen, this.Constants._secret).toString(),
      cedulaDestino: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cedulaDestino, this.Constants._secret).toString(),
      cuentaOrigen: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cuentaOrigen, this.Constants._secret).toString(),
      cuentaDestino: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cuentaDestino, this.Constants._secret).toString(),
      codLineaOrigen: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.codLineaOrigen, this.Constants._secret).toString(),
      codLineaDestino: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.codLineaDestino, this.Constants._secret).toString(),
      valTransferir: this.cuentasMatriculadasSelect.valTransferir,
      agenciacuentaAVO: localStorage.getItem("agenciaAso"),
      agenciacuentaAVD: localStorage.getItem("agenciaDestino"),
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APITransaccionNoEsEnLinea, dataTran).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      if (data[0][0].response === 1) {
        this.NitsServices.AlertMsm("Se ha enviado la solicitud correctamente")
        this.inicializarcarcampos()
      } else {
        this.NitsServices.AlertMsm("Ocurrio un error, intentalo nuevamente")
      }
    },
    err => {
      this.NitsServices.AlertMsm("Error de conexión con el servidor")
      console.log(err)
    });
  }

  convertNumber(data){
    var data1=data.detail.value.replace(/,/g, "")
    var data2=data1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.valor=data2
  }

  async Confirmar(){
    const alert = await this.alerCtrl.create({
     message: "El monto a trasladar es " +
     "<br> $ " + (this.valor) +
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
          this.validarSaldo()
          }
        }
      ]
    });
   await alert.present();
  }
  
  calculoGMF () {
    this.params = {
      cedula: CryptoJS.AES.encrypt(this.cuentasMatriculadasSelect.cedulaOrigen.toString(), this.Constants._secret).toString(),
      xml: `<variables><idMatricula>${this.cuentasMatriculadasSelect.idAsociadosTrasladoAV}</idMatricula></variables>`,
      caso: 8
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APICalculoGmf, this.params).subscribe(dataGMF => {
      let consultaAVparams = {
        cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
        caso: 2
      }
      this.authService.ApiSendData(this.Constants._APIConsultaAVtrasladoahorros, consultaAVparams).subscribe(data => {
        this.NitsServices.CargandoDismiss()
        if (data[0].length === 0) {
          this.NitsServices.AlertMsm("No hay datos para mostrar");
          return;
        }
        let saldoCuenta = data[0].filter(item => item.codlinea === this.cuentasMatriculadasSelect.codLineaOrigen.trim() && item.numerocuenta.trim() === this.cuentasMatriculadasSelect.cuentaOrigen.trim());
        this.saldoTotalCuenta = saldoCuenta[0].saldototal
        this.valorRetiroDisponible = saldoCuenta[0].saldototal - dataGMF[0][0].gmf
      },
        err => {
          this.NitsServices.CargandoDismiss()
          console.log(err)
        });
    },
    err => {
      this.NitsServices.CargandoDismiss()
      console.log(err)
    });
    // _APICalculoGmf 
  }

  inicializarcarcampos(){
    this.valor=""
    this.cuentasMatriculadasSelect=""
  }

  mostrarDatosTransferencia() {
    if (this.cuentasMatriculadasSelect) {
      this.calculoGMF()
    }
  }
}
