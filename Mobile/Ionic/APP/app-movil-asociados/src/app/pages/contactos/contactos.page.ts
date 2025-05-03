import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../../servicios/constants.service';
import {AuthService} from '../../servicios/auth.service';
import {NitsService} from '../../servicios/nits.service'

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  contactos: any

  constructor(
    private Constants: ConstantsService,
    private authService: AuthService,
    public  NitsServices: NitsService
  ) {
 
   }


  ngOnInit() {
    this.authService.ApiSendData(this.Constants._APIPublicidad, {esoperador:"N"}).subscribe(data => {
      this.contactos=data[0]
  },
       err => {
         console.log(err)
        })
  }


}
