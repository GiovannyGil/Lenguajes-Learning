import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuController, ToastController } from '@ionic/angular';
import { ConstantsService } from '../../servicios/constants.service';
import { AuthService } from '../../servicios/auth.service';
import { EventsService } from '../../servicios/events.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string;
  backbutton: boolean;
  mostrarbotonMenu: string;
  mostrarDatos: string;
  NombreAsociado: string;
  UltimoIngreso: string;
  logo: string;
  hojaestilos: string;
  cssUrl: SafeResourceUrl;

  // Definicion de la estructura de entidades
  entityData = {
    "0045": { logo: 'assets/imgs/logos/logo-cpio.png', estilos: 'assets/estilos/estilos0045.css', nombre: 'CPIO' },
    "0180": { logo: 'assets/imgs/logos/Logo-Femfuturo-APP-1.jpg', estilos: 'assets/estilos/estilos0180.css', nombre: 'FORJAR' },
    "0046": { logo: 'assets/imgs/logos/logo-canapro.png', estilos: 'assets/estilos/estilos0046.css', nombre: 'CANAPRO' },
    "0193": { logo: 'assets/imgs/logos/logo-fecom.jpg', estilos: 'assets/estilos/estilos0193.css', nombre: 'FECOM' },
    "0321": { logo: 'assets/imgs/logos/logo-fonducar.jpg', estilos: 'assets/estilos/estilos0321.css', nombre: 'FONDUCAR' },
    "0050": { logo: 'assets/imgs/logos/logo-cooptenjo.jpg', estilos: 'assets/estilos/estilos0050.css', nombre: 'COOPTENJO' },
    "0052": { logo: 'assets/imgs/logos/logo-coonfie.png', estilos: 'assets/estilos/estilos0052.css', nombre: 'COONFIE' },
    "0419": { logo: 'assets/imgs/logos/Dotakondor.jpg', estilos: 'assets/estilos/estilos0419.css', nombre: 'DOTAKONDOR' },
    "0015": { logo: 'assets/imgs/logos/logo-banafe-header.png', estilos: 'assets/estilos/estilos0015.css', nombre: 'BANAFE' },
    "0127": { logo: 'assets/imgs/logos/logo-fecsa.jpg', estilos: 'assets/estilos/estilos0127.css', nombre: 'FECSA' },
    "0432": { logo: 'assets/imgs/logos/logo-semillasfec-header.png', estilos: 'assets/estilos/estilos0432.css', nombre: 'SEMILLASFEC' },
    "0091": { logo: 'assets/imgs/logos/logo-riachon-header.jpg', estilos: 'assets/estilos/estilos0091.css', nombre: 'RIACHON' },
    "0048": { logo: 'assets/imgs/logos/logo-forjar-header.png', estilos: 'assets/estilos/estilos0048.css', nombre: 'FORJAR' },
    "0032": { logo: 'assets/imgs/logos/logo-guatape.jpg', estilos: 'assets/estilos/estilos0032.css', nombre: 'GUATAPE' }
  };

  constructor(
    public sanitizer: DomSanitizer,
    public menu: MenuController,
    public events: EventsService,
    private Constants: ConstantsService,
    private authService: AuthService,
    public router: Router,
    private toastController: ToastController,
  ) {
    this.mostrarbotonMenu = localStorage.getItem("mostrarMenu");
    this.mostrarDatos = localStorage.getItem("mostrarDatos");
    this.NombreAsociado = localStorage.getItem("nombreUsuario");
    this.UltimoIngreso = localStorage.getItem("ultimoIngresoAsociado");
    this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.hojaestilos);
  }

  ngOnInit() {
    this.definirEntidad();
  }

  definirEntidad() {
    // Verificación de localStorage antes de hacer la llamada a la API
    const codigo = localStorage.getItem("numeroentidad");
    if (codigo) {
      // Si hay un código de entidad en localStorage, aplica los estilos correspondientes
      this.applyStyles(codigo);
    } else {
      // Si no hay código en localStorage, realiza la llamada a la API
      this.authService.ApiSendData(this.Constants._APINumeroEntidad, "").subscribe(data => {
        const codigo = data[0];
        localStorage.setItem("numeroentidad", codigo);

        // if (!this.entityData[codigo]) {
        //   this.router.navigate(['/not-found']);
        // }

        this.applyStyles(codigo);
        this.events.publish('numeroentidad-menu', codigo);
      },
        err => {
          // Si la llamada a la API falla, intenta obtener el código de entidad de localStorage
          const fallbackCodigo = localStorage.getItem("numeroentidad") || this.Constants._codigoEntidad; // Puedes cambiar este código por el que prefieras como predeterminado
          this.applyStyles(fallbackCodigo);
          this.events.publish('numeroentidad-menu', fallbackCodigo);
          // this.router.navigate(['/not-found']);
          this.presentToast();
          console.log(err);
        });
    }
  }

  private applyStyles(codigo: string) {
    // Aplica el logo y los estilos basados en el código de la entidad
    this.logo = this.entityData[codigo].logo;
    this.hojaestilos = this.entityData[codigo].estilos;
    this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.hojaestilos);
    this.titulo = this.entityData[codigo].nombre
  }

  // toast / alerta informativa
  async presentToast() {
    const toast = await this.toastController.create({
      message: '<ion-icon  name="warning-outline"></ion-icon> ¡Servicio no disponible en este momento, por favor intente mas tarde o comuniquese con la entidad.!',
      duration: 4000, // duración en milisegundos
      position: 'top', // posición del toast
      // color: 'success', // color del toast 
      cssClass: 'custom-toast-notService', // clase personalizada para el toast
      
    });
    toast.present();
  }

  abrirMenu() {
    this.menu.toggle();
    this.events.publish('maneja-segundaclave', localStorage.getItem("manejasegundaclave"));
    this.events.publish('opciones-menu', localStorage.getItem("permisosoperador"));
    this.ValidarprocesoRA00047369();
    this.Validarmoduloactivo0088();
    this.Validarmoduloactivo0082();
    this.Validarmoduloactivo0095();
  }

  Validarmoduloactivo0088() {
    var paramodulo = {
      modulo: "0088"
    }
    this.authService.ApiSendData(this.Constants._APIvalidarmodulos, paramodulo).subscribe(data => {
      if (!this.Constants) {
        console.log("No hay constantes");
        alert('algo salio mal');
      }
      return this.events.publish('modulo-0088', data[0][0].modulo);
    },
      err => {
        console.log(err);
      });
  }

  Validarmoduloactivo0095() {
    var paramodulo = {
      modulo: "0095",
      dedonde: "M"
    }
    this.authService.ApiSendData(this.Constants._APIvalidarmodulos, paramodulo).subscribe(data => {
      return this.events.publish('modulo-0095', data[0][0].modulo);
    },
      err => {
        console.log(err);
      });
  }

  Validarmoduloactivo0082() {
    var paramodulo = {
      modulo: "0082"
    }
    this.authService.ApiSendData(this.Constants._APIvalidarmodulos, paramodulo).subscribe(data => {
      return this.events.publish('modulo-0082', data[0][0].modulo);
    },
      err => {
        console.log(err);
      });
  }

  ValidarprocesoRA00047369() {
    var param = {
      Proceso: CryptoJS.AES.encrypt("RA00047369", this.Constants._secret).toString()
    }
    this.authService.ApiSendData(this.Constants._APIValidarProcesos, param).subscribe(data => {
      return this.events.publish('RA00047369', data[0].procesoactivo);
    },
      err => {
        console.log(err);
      });
  }
}
