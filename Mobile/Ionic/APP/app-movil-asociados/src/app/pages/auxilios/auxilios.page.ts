import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';


@Component({
  selector: 'app-auxilios',
  templateUrl: './auxilios.page.html',
  styleUrls: ['./auxilios.page.scss'],
})
export class AuxiliosPage implements OnInit {
  auxilios
  Requisitos
  correoasesor
  mensaje
  auxilio
  datos = []
  constructor(
    public authService: AuthService,
    public Constants: ConstantsService,
    public NitsServices: NitsService,
    public alerCtrl: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.authService.ApiSendData(this.Constants._APITraerauxilios, "").subscribe(data => {
      if (data[0][0].Codigo == "401") {
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.auxilios = data[0];
      this.Requisitos = data[1];

      let inicio = 0
      let cantidad = this.Requisitos.length
      
      while (inicio >= 0 && inicio == cantidad) {
        this.requisitos(this.auxilios[inicio].IdparametroAuxiliosApp, this.Requisitos)
        inicio++;
      }
    },
      err => {
        console.log(err)
      });
  }

  requisitos = function (Idauxilio, Requisitos) {
    if (this.verau == false) {
      this.verau = true;
    } else {
      this.verau = false;
    }

    if (this.datos == undefined) {
      this.datos = [];
    }
    for (var i = 0; i < Requisitos.length; i++) {
      var currentNumber = Requisitos[i];
      if (currentNumber.IdparametroAuxiliosApp == Idauxilio) {
        this.datos.push(currentNumber);
      }
    }
  }

  Validacion(idauxilio) {
    var inicia = 0
    var termina = this.auxilios.length
    while (inicia >= 0 && inicia < termina) {
      if (this.auxilios[inicia].IdparametroAuxiliosApp == idauxilio) {
        this.mensaje = this.auxilios[inicia].mensaje;
        this.correoasesor = this.auxilios[inicia].correoReceptor;
        this.auxilio = this.auxilios[inicia].auxilio;
      }
      inicia++
    }

    const navigationExtras: NavigationExtras = {
      queryParams: { data: this.Requisitos, id: idauxilio, correoasesor: this.correoasesor, mensaje: this.mensaje, auxilio: this.auxilio, usuario: localStorage.getItem("operador") },
    }

    this.router.navigateByUrl("/auxilios-requisitos", navigationExtras);
  }

}
