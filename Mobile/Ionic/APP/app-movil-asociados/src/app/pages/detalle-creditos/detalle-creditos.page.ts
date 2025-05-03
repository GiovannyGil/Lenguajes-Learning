import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-creditos',
  templateUrl: './detalle-creditos.page.html',
  styleUrls: ['./detalle-creditos.page.scss'],
})
export class DetalleCreditosPage implements OnInit {
seguimiento: any
  constructor(public router:Router) {
    this.seguimiento=this.router.getCurrentNavigation().extras.queryParams.detalle
   }
 
  ngOnInit() {
  }

}
