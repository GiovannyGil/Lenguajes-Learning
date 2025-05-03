import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-novedades',
  templateUrl: './detalle-novedades.page.html',
  styleUrls: ['./detalle-novedades.page.scss'],
})
export class DetalleNovedadesPage implements OnInit {
  seguimiento: any

  constructor(public router: Router) { 
    this.seguimiento=this.router.getCurrentNavigation().extras.queryParams.detalle
  }

  ngOnInit() {
  }

}
