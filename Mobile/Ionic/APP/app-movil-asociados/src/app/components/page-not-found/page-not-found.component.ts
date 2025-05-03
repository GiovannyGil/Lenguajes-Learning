import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventsService } from '../../servicios/events.service'

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {

  logoinicio;
  hojaestilos: string;
  cssUrl: SafeResourceUrl;
  numeroentidad

  // Definicion de la estructura de entidades
  entityData = {
    "0045": { logo: 'assets/imgs/logos/logo-cpio.png', estilos: 'assets/estilos/estilos0045.css' },
    "0180": { logo: 'assets/imgs/logos/Logo-Femfuturo-APP-1.jpg', estilos: 'assets/estilos/estilos0180.css' },
    "0046": { logo: 'assets/imgs/logos/logo-canapro.png', estilos: 'assets/estilos/estilos0046.css' },
    "0193": { logo: 'assets/imgs/logos/logo-fecom.jpg', estilos: 'assets/estilos/estilos0193.css' },
    "0321": { logo: 'assets/imgs/logos/logo-fonducar.jpg', estilos: 'assets/estilos/estilos0321.css' },
    "0050": { logo: 'assets/imgs/logos/logo-cooptenjo.jpg', estilos: 'assets/estilos/estilos0050.css' },
    "0052": { logo: 'assets/imgs/logos/logo-coonfie.png', estilos: 'assets/estilos/estilos0052.css' },
    "0419": { logo: 'assets/imgs/logos/Dotakondor.jpg', estilos: 'assets/estilos/estilos0419.css' },
    "0015": { logo: 'assets/imgs/logos/logo-banafe-header.png', estilos: 'assets/estilos/estilos0015.css' },
    "0127": { logo: 'assets/imgs/logos/logo-fecsa.jpg', estilos: 'assets/estilos/estilos0127.css' },
    "0432": { logo: 'assets/imgs/logos/logo-semillasfec-header.png', estilos: 'assets/estilos/estilos0432.css' },
    "0091": { logo: 'assets/imgs/logos/logo-riachon-header.jpg', estilos: 'assets/estilos/estilos0091.css' },
    "0048": { logo: 'assets/imgs/logos/logo-forjar-header.png', estilos: 'assets/estilos/estilos0048.css' },
    "0032": { logo: 'assets/imgs/logos/logo-guatape.jpg', estilos: 'assets/estilos/estilos0032.css' }
  };

  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    public events: EventsService,
  ) { }

  ngOnInit() {
    const codigo = "0045"

    if(codigo === "0045"){
      this.logoinicio = this.entityData[codigo].logo
      this.hojaestilos = this.entityData[codigo].estilos
    }
  }
}
