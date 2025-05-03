import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.page.html',
  styleUrls: ['./seguros.page.scss'],
})
export class SegurosPage implements OnInit {
  seguros

  constructor(
    public authService: AuthService,
    public Constants: ConstantsService,
    public NitsServices: NitsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.authService.ApiSendData(this.Constants._APICrearsolicituddeseguros, "").subscribe(data => {
      if (data[0][0].Codigo == "401") {
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }

      this.seguros = data[0]

    },
      err => {
        console.log(err)
      });
  }

  crearseguros(tipo) {

    const navigationExtras: NavigationExtras = {
      queryParams: tipo
    }

    if (tipo == 'TM') {
      this.router.navigateByUrl("/seguros-movil", navigationExtras);
    }
    if (tipo == 'SO') {
      this.router.navigateByUrl("/seguros-soat", navigationExtras);
    }
    if (tipo == 'VI') {
      this.router.navigateByUrl("/seguros-vida", navigationExtras);
    }
    if (tipo == 'PE') {
      this.router.navigateByUrl("/seguros-exequial", navigationExtras);
    }
    if (tipo == 'FM') {
      this.router.navigateByUrl("/seguros-fmc", navigationExtras);
    }
    if (tipo == 'SH') {
      this.router.navigateByUrl("/seguros-hogar", navigationExtras);
    }
    if (tipo == 'VE') {
      this.router.navigateByUrl("/seguros-vehiculos", navigationExtras);
    }
  }

}
