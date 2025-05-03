import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';
import { EventsService } from 'src/app/servicios/events.service';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  botonback: boolean
  seleccionsubmenu: string
  titulomenu = 'Menú'
  manejasegundaclave
  mensajeCodigo: any
  codigoIngreso
  parametters: any
  respuestaCodigo
  modulo0088
  modulo0082
  modulo0095
  permisoestadocuentas
  permisopagocreditos
  permisotrasladoahorro
  permisotrasladotercero
  permisoretirosgana
  permisocertificados
  permisocertificadosafi
  permisocertificadosdeu
  permisocertificadosing
  permisosimulacioncdat
  permisosimulacioncredito
  numeroentidad

  constructor(
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
    public events: EventsService,
    public router: Router,
    public alerCtrl: AlertController
  ) {
    this.events.subscribe('numeroentidad-menu', (param) => {//Evento recibido
      this.numeroentidad = param;
    });

    this.events.subscribe('maneja-segundaclave', (param) => {//Evento recibido
      this.manejasegundaclave = param;
    });

    this.events.subscribe('modulo-0088', (param) => {//Evento recibido
      this.modulo0088 = param;
    });

    this.events.subscribe('modulo-0095', (param) => {//Evento recibido
      this.modulo0095 = param;
    });

    this.events.subscribe('modulo-0082', (param) => {//Evento recibido
      this.modulo0082 = param;
    });

    this.events.subscribe('opciones-menu', (param) => {
      var cadenapermisos = param

      if (cadenapermisos != undefined) {
        this.permisoestadocuentas = cadenapermisos.search("ESTCTA") >= 0;
        this.permisopagocreditos = cadenapermisos.search("PAGCRE") >= 0;
        this.permisotrasladoahorro = cadenapermisos.search("TRAAHO") >= 0;
        this.permisotrasladotercero = cadenapermisos.search("TRATER") >= 0;
        this.permisoretirosgana = cadenapermisos.search("RETGAN") >= 0;
        this.permisocertificados = cadenapermisos.search("CERAFI") >= 0 || cadenapermisos.search("CERDEU") >= 0 || cadenapermisos.search("CERING") >= 0;
        this.permisocertificadosafi = cadenapermisos.search("CERAFI") >= 0;
        this.permisocertificadosdeu = cadenapermisos.search("CERDEU") >= 0;
        this.permisocertificadosing = cadenapermisos.search("CERING") >= 0;
        this.permisosimulacioncdat = cadenapermisos.search("SIMCDT") >= 0;
        this.permisosimulacioncredito = cadenapermisos.search("SIMCRE") >= 0;
      }
    });
  }

  ngOnInit() { }

  PageCertificado(data) {
    const navigationExtras: NavigationExtras = {
      queryParams: data
    }

    this.router.navigateByUrl('/certificados', navigationExtras)
  }


  SegundaClave() {
    if (localStorage.getItem("manejapreguntasSC") == 'S') {
      const navigationExtras: NavigationExtras = {
        queryParams: { dedondeviene: 'segundaclave' }
      }
      this.router.navigateByUrl('/respuestas-seguridad', navigationExtras);
    } else {
      this.router.navigateByUrl('/segunda-clave');
    }
  }

  AbrirSubmenu(data) {
    this.botonback = true
    this.seleccionsubmenu = data;
    this.titulomenu = data
  }

  CerrarSubmenu() {
    this.botonback = false
    this.seleccionsubmenu = undefined;
    this.titulomenu = 'Menú'
  }
}
