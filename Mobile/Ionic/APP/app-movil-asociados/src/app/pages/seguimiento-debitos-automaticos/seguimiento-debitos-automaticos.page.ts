import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguimiento-debitos-automaticos',
  templateUrl: './seguimiento-debitos-automaticos.page.html',
  styleUrls: ['./seguimiento-debitos-automaticos.page.scss'],
})
export class SeguimientoDebitosAutomaticosPage implements OnInit {
  DebitoAutom: any

  constructor(public router: Router) {
    this.DebitoAutom=this.router.getCurrentNavigation().extras.queryParams.sdebito
   }

  ngOnInit() {
  }

}
