import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-asociado',
  templateUrl: './about-asociado.page.html',
  styleUrls: ['./about-asociado.page.scss'],
})
export class AboutAsociadoPage implements OnInit {
  asociado: {
    nombreintegrado?: string;
    direccion?: string;
    telefono1?: string;
    celular?: string;
    email?: string;
    fechanacimiento?: string;
    nombreciudad?: string;
  } = {}
  numeroentidad = localStorage.getItem("numeroentidad")
  logoabout
  constructor(
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
    public router: Router
  ) {

  }

  ngOnInit() {
    if (this.numeroentidad == '0015') {
      this.logoabout = "assets/imgs/logos/logo-banafe.png"
    } else if (this.numeroentidad == '0432') {
      this.logoabout = "assets/imgs/logos/logo-semillasfec.png"
    }else if(this.numeroentidad=='0091'){
      this.logoabout="assets/imgs/logos/logo-riachon.jpg"
    }else if(this.numeroentidad == "0045") {
      this.logoabout = 'assets/imgs/logos/LogoCPIO2.png'
    }else if(this.numeroentidad == "0127") {
      this.logoabout = 'assets/imgs/logos/logo-galeria.png'
    }else if(this.numeroentidad == "0321") {
      this.logoabout = 'assets/imgs/logos/logo-fonducar.jpg'
    }else if(this.numeroentidad == "0180") {
      this.logoabout = 'assets/imgs/logos/Logo-Femfuturo-APP-1.jpg'
    } else if(this.numeroentidad == "0193") {
      this.logoabout = 'assets/imgs/logos/logo-fecom2.jpg'
    }  else if(this.numeroentidad == "0050") {
      this.logoabout = 'assets/imgs/logos/logo-cooptenjo.jpg'
    } else if(this.numeroentidad == "0052") {
      this.logoabout = 'assets/imgs/logos/logo-coonfie2.jpg'
    } else if(this.numeroentidad == "0046") {
      this.logoabout = 'assets/imgs/logos/logo-canapro.png'
    } else if(this.numeroentidad == "0048") {
      this.logoabout = 'assets/imgs/logos/logo-forjar-header.png'
    } else if(this.numeroentidad == "0419") {
      this.logoabout = 'assets/imgs/logos/Dotakondor.jpg'
    } else if(this.numeroentidad == "0032") {
      this.logoabout = 'assets/imgs/logos/logo-guatape.jpg'
    } else {
      this.logoabout = "assets/imgs/logos/opa2-img.png"
    }

    var params = {
      CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      MensajeError: "",
      NumeroError: ""
    }

    this.authService.ApiSendData(this.Constants._APIDatosAsociados, params).subscribe(data => {
      if (data[0][0].Codigo != undefined) {
        if (data[0][0].Codigo == "401") {

          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }
      }

      var nombreintegrado = CryptoJS.AES.decrypt(
        data[0][0].nombreintegrado,
        this.Constants._secret
      );
      data[0][0].nombreintegrado = CryptoJS.enc.Utf8.stringify(nombreintegrado);

      var direccion = CryptoJS.AES.decrypt(
        data[0][0].direccion,
        this.Constants._secret
      );
      data[0][0].direccion = CryptoJS.enc.Utf8.stringify(direccion);

      var telefono1 = CryptoJS.AES.decrypt(
        data[0][0].telefono1,
        this.Constants._secret
      );
      data[0][0].telefono1 = CryptoJS.enc.Utf8.stringify(telefono1);

      var celular = CryptoJS.AES.decrypt(
        data[0][0].celular,
        this.Constants._secret
      );
      data[0][0].celular = CryptoJS.enc.Utf8.stringify(celular);

      var email = CryptoJS.AES.decrypt(
        data[0][0].email,
        this.Constants._secret
      );
      data[0][0].email = CryptoJS.enc.Utf8.stringify(email);

      var fechanacimiento = CryptoJS.AES.decrypt(
        data[0][0].fechanacimiento,
        this.Constants._secret
      );
      data[0][0].fechanacimiento = CryptoJS.enc.Utf8.stringify(fechanacimiento).substr(0, 12);

      var nombreciudad = CryptoJS.AES.decrypt(
        data[0][0].nombreciudad,
        this.Constants._secret
      );
      data[0][0].nombreciudad = CryptoJS.enc.Utf8.stringify(nombreciudad);

      this.asociado = data[0][0];

    },
      err => {
        console.log(err)
      })
  }
}
