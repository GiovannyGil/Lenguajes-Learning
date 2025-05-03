import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-psemodal-historico',
  templateUrl: './psemodal-historico.page.html',
  styleUrls: ['./psemodal-historico.page.scss'],
})
export class PSEModalHistoricoPage implements OnInit {
  parameters = {}
  pag = 0
  historicos = []
  constructor(public authService: AuthService,
    public Constants: ConstantsService,
    public NitsServices: NitsService,
    public alerCtrl: AlertController) { }

  ngOnInit() {

    this.consutarhistoricos(1)

  }


  loadMore() {
    this.pag = this.pag + 1
    this.consutarhistoricos(this.pag)
  }


  consutarhistoricos(valorpage) {

    this.pag = valorpage

    this.parameters = {
      pag: this.pag,
      caso: 1,
      cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIPseHistorico, this.parameters).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      this.historicos = data[0]
      if (this.historicos.length == 0) {
        this.pag = 0
      }

    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }
}
