import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../../servicios/constants.service';
import {AuthService} from '../../servicios/auth.service';
import {NitsService} from '../../servicios/nits.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private Constants: ConstantsService,
    private authService: AuthService,
    public  NitsServices: NitsService,
    public alerCtrl: AlertController,
    public router: Router
  ) { 

  }

  ngOnInit() { }

  inicio(){
    this.router.navigateByUrl('/about-asociado')
   } 

   async salir() {
    const alert = await this.alerCtrl.create({
      message: '¿Está seguro de salir de la aplicación?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            
          }
        }, {
          text: 'ACEPTAR',
          handler: () => {
            this.Cerrarsession()
          }
        }
      ]
    });
    await alert.present();
  }

  async cerrar(){
    const alert =  await this.alerCtrl.create({
      message: 'Sesión cerrada con éxito',
      buttons: [
        {
          text: 'ACEPTAR',
          handler: () => {}
        }
      ]
    });
    await alert.present();
  }

  Cerrarsession(){
    var parametters ={
      usuario:localStorage.getItem("operador")
    }
  
    this.authService.ApiSendData(this.Constants._APICerrarsession, parametters).subscribe(res => {
      this.cerrar()
      this.NitsServices.LogIn()
      
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }
}
