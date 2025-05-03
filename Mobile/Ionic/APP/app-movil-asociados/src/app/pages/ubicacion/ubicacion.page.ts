import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router'
import {ConstantsService} from '../../servicios/constants.service';
import {AuthService} from '../../servicios/auth.service';
import {NitsService} from '../../servicios/nits.service'

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  oficinas: any

  constructor(
    private Constants: ConstantsService,
    private authService: AuthService,
    public  NitsServices: NitsService,
    public router:Router
  ) { }

  ngOnInit() {
    this.authService.ApiSendData(this.Constants._APIPublicidad, {esoperador:"N"}).subscribe(data => {
      this.oficinas=data[2]
    },
         err => {
           console.log(err)
          })
  }

  ubicacion(ubicacion){
    const navigationExtras: NavigationExtras = {
      queryParams: ubicacion
    }

    this.router.navigateByUrl("/ubicacion-iframe", navigationExtras);
  }

}
