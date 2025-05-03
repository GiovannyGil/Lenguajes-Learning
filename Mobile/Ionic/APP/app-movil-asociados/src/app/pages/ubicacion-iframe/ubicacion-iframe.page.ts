import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicacion-iframe',
  templateUrl: './ubicacion-iframe.page.html',
  styleUrls: ['./ubicacion-iframe.page.scss'],
})
export class UbicacionIframePage implements OnInit {
ubicacion

  constructor(
    public router: Router,
    private domsanitizer: DomSanitizer 
  ) { 
    var URL=this.router.getCurrentNavigation().extras.queryParams.data;
    this.ubicacion=this.domsanitizer.bypassSecurityTrustResourceUrl(URL)
  }

  ngOnInit() {
  }

}
