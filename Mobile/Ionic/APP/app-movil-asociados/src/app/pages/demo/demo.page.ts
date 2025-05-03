import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ConstantsService} from '../../servicios/constants.service';
import {AuthService} from '../../servicios/auth.service';
import {NitsService} from '../../servicios/nits.service'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {
demo: any

  constructor(
    private domsanitizer: DomSanitizer,
    private Constants: ConstantsService,
    private authService: AuthService,
    public  NitsServices: NitsService
  ) { }

  ngOnInit() {
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIPublicidad, {esoperador:"N"}).subscribe(data => {
    this.NitsServices.CargandoDismiss()
    if(data[4].length){
      var datademo=data[4][0].Rutavideo
      this.demo = this.domsanitizer.bypassSecurityTrustResourceUrl(datademo)
    }
     //console.log(datademo)

    },
         err => {
           console.log(err)
          })
  }

}
