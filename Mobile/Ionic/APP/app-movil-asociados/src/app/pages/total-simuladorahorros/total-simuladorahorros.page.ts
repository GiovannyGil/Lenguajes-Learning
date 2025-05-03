import { Component } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import {Platform} from '@ionic/angular'
import { Router } from '@angular/router';
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-total-simuladorahorros',
  templateUrl: './total-simuladorahorros.page.html',
  styleUrls: ['./total-simuladorahorros.page.scss'],
})
export class TotalSimuladorahorrosPage {
  detalle: any
  paraimpresion: any
  dataR
  capitaliza
  obj=null
  propertyFilter = [
    {
        prop: "NRO",
        format:false
     }, {
        prop: "CAPITAL",
        format: true
     }, {
        prop: "INTERES_GANADO",
        format: true
     }, {
        prop: "INTERES_PAGADO",
        format: true
     }, {
        prop: "RETEFUENTE",
        format: true
     }
  ];

  constructor(
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
    public file: File,
    public plt: Platform,
    public fileOpener: FileOpener,
    public router: Router
  ) {
    this.detalle=this.router.getCurrentNavigation().extras.queryParams.totalsimulacion
    this.paraimpresion=this.router.getCurrentNavigation().extras.queryParams.paraimpresion
  }


   Imprimir() {
      this.NitsServices.Cargando()
  
      this.authService.ApiBlob(this.Constants._APISimuladorAhorrosimprimir, this.paraimpresion)
        .subscribe(
          data => {
            this.NitsServices.CargandoDismiss()
           this.GuardarPDF(data)
          },
          err => {
            this.NitsServices.CargandoDismiss()
            console.log(err)
          }
        )
    }


  

    GuardarPDF(buffer) {
      var blob = new Blob([buffer], { type: 'application/pdf' })
  
      if (this.plt.is('cordova')) {
        let filePath = ((this.file.externalRootDirectory) ? this.file.externalRootDirectory : this.file.documentsDirectory);
        const temporalName = Math.round((new Date()).getTime() / 1000) + '_certificado.pdf';
  


        this.file.checkDir(this.file.externalApplicationStorageDirectory, 'certificado')
          .then(_ => {
            this.file.writeFile(this.file.externalApplicationStorageDirectory + 'certificado/', temporalName, blob).then(response => {
              this.fileOpener.open(this.file.externalApplicationStorageDirectory + 'certificado/' + temporalName, 'application/pdf');
            }).catch(err => {
              console.log(err);
            })
          })
          .catch(err => {
            this.file.createDir(this.file.externalApplicationStorageDirectory, 'certificado', false).then(result => {
              this.file.writeFile(this.file.externalApplicationStorageDirectory + 'certificado/', temporalName, blob).then(response => {
                this.fileOpener.open(this.file.externalApplicationStorageDirectory + 'certificado/' + temporalName, 'application/pdf');
              }).catch(err => {
                console.log(err);
              })
            })
          });
       } if (this.plt.is('ios')){
        let filePath = ((this.file.dataDirectory) ? this.file.dataDirectory : this.file.documentsDirectory);
        const temporalName = Math.round((new Date()).getTime() / 1000) + '_certificado.pdf';
  
        this.file.checkDir(this.file.dataDirectory, 'certificados')
          .then(_ => {
            this.file.writeFile(this.file.dataDirectory + 'certificados/', temporalName, blob).then(response => {
              this.fileOpener.open(this.file.dataDirectory + 'certificados/' + temporalName, 'application/pdf');
            }).catch(err => {
              console.log(err);
            })
          })
          .catch(err => {
            this.file.createDir(this.file.dataDirectory, 'certificados', false).then(result => {
              this.file.writeFile(this.file.dataDirectory + 'certificados/', temporalName, blob).then(response => {
                this.fileOpener.open(this.file.dataDirectory + 'certificados/' + temporalName, 'application/pdf');
              }).catch(err => {
                console.log(err);
              })
            })
          });
  
      }
      else {
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      }
    }
  
  

 
}


