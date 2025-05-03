import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';

@Component({
  selector: 'app-seguros-movil',
  templateUrl: './seguros-movil.page.html',
  styleUrls: ['./seguros-movil.page.scss'],
})
export class SegurosMovilPage implements OnInit {
select=[]
tipo
habilitapolizas 
habilitagrid 
habilitacamposePE 
create
edit
quees

delete=true
// input
// habilita
// habilitaguia
// habilitatipo
  constructor(
    public authService:AuthService,
    public Constants: ConstantsService,
    public NitsServices:NitsService,
    public router: Router,
    public alerCtrl:AlertController
  ) {
    this.tipo=this.router.getCurrentNavigation().extras.queryParams
   }

  ngOnInit() {
    this.buscardatos()
  }

  buscardatos(){
    var parametter={
      params:{
        codigoseguro: this.tipo,
        cedulasociado: localStorage.getItem("operador")
      }
    }
    this.authService.ApiSendData(this.Constants._APIDatosmodificaseguros, parametter).subscribe(data => {  
      if(data[0].length>0){
        if(data[0][0].Codigo=="401"){
          this.NitsServices.mostrarMensajes(data)
          localStorage.clear()
          this.NitsServices.LogIn()
          return
        }
      }

      if(data[0][0].Codigo=='000'){
        this.NitsServices.mostrarMensajes(data)
        return
      }
      this.habilitapolizas = true
      this.habilitagrid = true
      this.habilitacamposePE = false
      this.select['beneficiariopoliza']=[]
      var empieza = 0
      var termina = data[0].length
      
    
      while (empieza >= 0 && empieza < termina) {
          this.select['beneficiariopoliza'].push(data[0][empieza])
          empieza++
      }

        },
        err => {
          console.log(err)
         });
  }

  btnNew(){
    //this.select['seguros'] = [];
    //this.habilitaguia = false

    if (this.create) {
        this.quees = "guarda"


          var pararegistrar = {
            params:{
                quees: this.quees,
                cedula: localStorage.getItem("operador"),
                scope:{seguro:this.tipo},
                seguro:this.tipo
            }
          }

            this.authService.ApiSendData(this.Constants._APIregistrarsolicitudMovil, pararegistrar).subscribe(data => {  
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
            this.edit = false
            this.create = false
            this.delete = true
            this.habilitacamposePE = false
            this.habilitagrid = true
            this.buscardatos()
            return true;
    } else {
        this.select['beneficiariopoliza'] = []
        this.create = true
        this.edit = true
        this.habilitagrid = false
        this.delete = false
        this.habilitacamposePE = true
    }
    // this.habilita = false
  }

  del(){
    if (!this.delete) {
      this.create = false
      this.delete = true
      this.habilitacamposePE = false
      this.habilitagrid = true
      this.buscardatos()
      return
    }
    this.Confirmar()
  }

  async Confirmar(){
    const alert = await this.alerCtrl.create({
     message: "Se eliminara toda la poliza " +
      "<br> ¿Está seguro de hacer esta operación?",
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'OK',
          handler: data => {
          this.paraeliminar()
          }
        }
      ]
    });
   await alert.present();
  }

  paraeliminar(){
    this.quees = 'eliminatodo'
    var parameliminar = {
      params:{
      scope:{seguro:this.tipo},
      quees:this.quees,
      cedula:localStorage.getItem("operador"),
      seguro:this.tipo
      }
    }

    this.authService.ApiSendData(this.Constants._APIregistrarsolicitudMovil, parameliminar).subscribe(data => {  
      if(data[0][0].Codigo=="401"){
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.NitsServices.mostrarMensajes(data)
  
      this.delete = false
      this.create = false
      this.edit = false
      this.habilitagrid = false
        },
        err => {
          console.log(err)
    });
  }

}