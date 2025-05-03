import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';


@Component({
  selector: 'app-sedes-vacacionales',
  templateUrl: './sedes-vacacionales.page.html',
  styleUrls: ['./sedes-vacacionales.page.scss'],
})
export class SedesVacacionalesPage implements OnInit {
  datossedes=[]
  fechassedes=[]
  fechassedesuno=[]
  ver:boolean
  identifica
  email

  constructor(
    public authService:AuthService,
    public Constants: ConstantsService,
    public NitsServices:NitsService,
    public alerCtrl:AlertController
  ) { }

  ngOnInit() {
    this.authService.ApiSendData(this.Constants._APISedesVAcasionales, "").subscribe(data => { 
      if(data[0][0].Codigo=="401"){
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.datossedes = data[0];
      this.fechassedes = data[1];
        },
        err => {
          console.log(err)
         });
  }

  armarfechas(id, fechas){
    if (id == "") {
      this.ver = false;
      return;
  }
  if (this.ver == true) {
      this.ver = false;
      return;
  } else {
      this.ver = true;
  }

  this.fechassedesuno = [];

  for (var i = 0; i < fechas.length; i++) {
      var currentNumber = fechas[i];
      if (currentNumber.idsedesVacacionalesApp == id) {
          this.fechassedesuno.push(currentNumber);
      }
  }
  }

  async Reservar(Idfechas) {
    const alert = await this.alerCtrl.create({
      header: 'Por seguridad ingrese sus datos',
      inputs: [
        {
          name: 'identificacion',
          placeholder: 'Identificación'
        },
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }, {
          text: 'OK',
          handler: (data) => {
            if(data.identificacion=="" || data.email==""){
              this.NitsServices.AlertMsm("Debe diligenciar todos los campos")
              return
            }

              if(data.identificacion!="" && data.email!=""){
              this.identifica = data.identificacion.replace(/ /g, "")
              this.email      = data.email.replace(/ /g, "")
                  this.ConfirmarReserva(this.identifica, this.email, Idfechas);
             }
          }
        }
      ]
    });
    await alert.present();
  }

  ConfirmarReserva(identificacion,email, Idfechas){
    var paramreserva={
      params:{
        cedula: identificacion,
        email: email,
        idReserva: Idfechas
      }
    }
    this.authService.ApiSendData(this.Constants._APIReservasVAcasionales, paramreserva).subscribe(data => { 
      if(data[0][0].Codigo=="401"){
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.NitsServices.mostrarMensajes(data)
        },
        err => {
          console.log(err)
         });
  }

}
