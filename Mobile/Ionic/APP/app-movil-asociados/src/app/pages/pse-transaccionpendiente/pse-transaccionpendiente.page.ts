import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';

@Component({
  selector: 'app-pse-transaccionpendiente',
  templateUrl: './pse-transaccionpendiente.page.html',
  styleUrls: ['./pse-transaccionpendiente.page.scss'],
})
export class PseTransaccionpendientePage implements OnInit {
  Datos: {
    pago?: string;
    estado?: string;
    fechagenero?: string;
    total_con_iva?: string;
  } = {}
  constructor(    public authService:AuthService,
    public Constants: ConstantsService,
    public NitsServices:NitsService,
    public alerCtrl:AlertController,
    public router: Router) {

    this.Datos = this.router.getCurrentNavigation().extras.queryParams.data[0][0];

   }

  ngOnInit() {
  }

}
