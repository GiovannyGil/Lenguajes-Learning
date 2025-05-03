import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-PSEInicio',
  templateUrl: './PSEInicio.page.html',
  styleUrls: ['./PSEInicio.page.scss'],
})
export class PSEInicioPage implements OnInit {
  parameters = {}
  transacciones = []
  confirmarpse = false
  Mensaje

  constructor(
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public router:Router,

  ) {

   }

  ngOnInit() {



 // $scope.input = {};
 this.parameters  = {
  cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
  caso: 1
}

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIPsegeneral, this.parameters).subscribe(data => {
    this.NitsServices.CargandoDismiss()

  if (data[0][0].Codigo =="999"){
    this.NitsServices.mostrarMensajes(data)
    this.router.navigateByUrl('/estado-cuentas')
  } else {
      var Mensaje = CryptoJS.AES.decrypt(
        data[0][0].Mensaje,
        this.Constants._secret
      );
      data[0][0].Mensaje = CryptoJS.enc.Utf8.stringify(Mensaje);
      this.Mensaje=data[0][0].Mensaje
      //this.NitsServices.mostrarMensajes(data)
    }

      },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });

    }

submit() {
  if (!this.confirmarpse) {
    this.NitsServices.AlertMsm("Debes aceptar haber leído los mensajes informativos")
      return;
  }
  this.router.navigateByUrl('/pse-estado-de-cuentas')
  }
}
