import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';


@Component({
  selector: 'app-seguros-vida',
  templateUrl: './seguros-vida.page.html',
  styleUrls: ['./seguros-vida.page.scss'],
})
export class SegurosVidaPage implements OnInit {
  input: {
    codigo?: string;
    nombre?: string;
    parentesco?: string;
    valor1?: string;
  } = {};
  select = [];
  delete = true
  habilitapolizas
  habilitagrid
  habilitacamposePE
  create
  quees
  edit
  tipo

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
      if(data[0].length<=0){
        return
      }

      if(data[0][0].Codigo=='000'){
        this.NitsServices.mostrarMensajes(data)
        return
      }

      this.habilitapolizas = true
      this.habilitagrid = true
      this.habilitacamposePE = false
      this.select['polizas'] = data[0]
      this.select['beneficiariopoliza']=[]
      this.select['modificados']=[]
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
    if (this.create) {
            this.quees = "guarda"
            this.edit = false
            this.create = false
            this.delete = true
            this.habilitacamposePE = false
            this.habilitagrid = true
            this.select['polizas']=''
            this.buscardatos()
    } else {
        this.select['beneficiariopoliza'] = []
        this.create = true
        this.edit = true
        this.habilitagrid = false
        this.delete = false
        this.habilitacamposePE = true
    }
  }



  del(){
      this.create = false
      //this.delete = false
      this.habilitacamposePE = false
      this.habilitagrid = true
      this.buscardatos()

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

    this.authService.ApiSendData(this.Constants._APIregistrarsolicitudvida, parameliminar).subscribe(data => {
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
      this.select['polizas'] = []
        },
        err => {
          console.log(err)
    });
  }

  Edit(){
    if (!this.edit) {
        this.quees = "edita"
        this.create = false
        this.edit = false
        this.input.codigo =''
        this.buscardatos()
    } else {
          if (this.quees == 'edita' && this.select['modificados'].length >0) {
            this.delete = false
            this.create = false
            this.edit = false
            this.input = {}
            this.select['polizas'] = []
            this.create = false
            this.edit = false
            this.habilitagrid = true
            this.habilitacamposePE = false
            //this.buscardatos()
            return true;
        }

           if(this.input['nombre']==undefined || this.input['nombre']=='' || this.input['parentesco']==undefined || this.input['parentesco']==''
            ||this.input['valor1']==undefined || this.input['valor1']==''){
              this.NitsServices.AlertMsm('Debe completar todos los campos')
              return
            }
            this.quees = "guarda"
            this.input['seguro']=this.tipo
            var paramsnuevo = {
              params:{
                scope:this.input,
                quees: this.quees,
                cedula: localStorage.getItem("operador"),
              }
            }

           this.authService.ApiSendData(this.Constants._APIregistrarsolicitudvida, paramsnuevo).subscribe(data => {
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

            this.create = false
            this.edit = false
            this.input = {}
            this.select['polizas'] = []
            this.create = false
            this.edit = false
            this.delete = false
            this.habilitagrid = true

            this.buscardatos()
            return true;

    }
  }

  async Eliminar(beneficiarios){
    const alert = await this.alerCtrl.create({
     message: "Se eliminara este beneficiario de la poliza " +
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
          this.elimina(beneficiarios)
          }
        }
      ]
    });
   await alert.present();
  }


  elimina(beneficiarios){
    this.quees = 'elimina'
    var paraeliminar = {
      params:{
        scope: [beneficiarios],
        quees: this.quees,
        cedula: localStorage.getItem("operador"),
        seguro: this.tipo
      }
    }
    this.authService.ApiSendData(this.Constants._APIregistrarsolicitudvida, paraeliminar).subscribe(data => {
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
      this.input = {}
      this.select['polizas'] = []
      this.habilitagrid = false

        },
        err => {
          console.log(err)
    });

  }

  datospoliza(poliza) {
    this.select['beneficiariopoliza'] = []
    var empieza = 0
    var termina = this.select['polizas'].length

    while (empieza >= 0 && empieza < termina) {
        if (this.select['polizas'][empieza].codigoservicio == poliza) {
            this.select['beneficiariopoliza'].push(this.select['polizas'][empieza])
        }
        empieza++
    }
}

}
