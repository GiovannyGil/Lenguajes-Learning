import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-ahorros',
  templateUrl: './detalle-ahorros.page.html',
  styleUrls: ['./detalle-ahorros.page.scss'],
})
export class DetalleAhorrosPage implements OnInit {
seguimiento:any
  constructor(public router:Router) {
    this.seguimiento=this.router.getCurrentNavigation().extras.queryParams.detalle
   }

  ngOnInit() {
  }

}
