import { Component } from '@angular/core';
import { PdfMakeWrapper, Txt, Table} from 'pdfmake-wrapper';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import {Platform} from '@ionic/angular';
import { Router } from '@angular/router';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-total-simuladorcreditos',
  templateUrl: './total-simuladorcreditos.page.html',
  styleUrls: ['./total-simuladorcreditos.page.scss'],
})
export class TotalSimuladorcreditosPage {
  detalle: any
  paraimpresion: any
  obj = null
  dataR
  costos
  NombresCostos
  propertyFilter = [
    {
      prop: "NRO",
      format: false
    },
    {
      prop: "FECHAPAGO",
      format: false
    },
    {
      prop: "CUOTA",
      format: true
    },
    {
      prop: "ABONOCAPITAL",
      format: true
    },
    {
      prop: "ABONOINTERES",
      format: true
    },
    {
      prop: "TOTALCAPITAL",
      format: true
    },
    {
      prop: "TOTALINTERES",
      format: true
    }
  ];
  numeroentidad = localStorage.getItem("numeroentidad")

  constructor(
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
    public router: Router,
    public file: File,
    public plt: Platform,
    public fileOpener: FileOpener,
  ) {
    this.detalle = this.router.getCurrentNavigation().extras.queryParams.totalsimulacion
    this.paraimpresion = this.router.getCurrentNavigation().extras.queryParams.paraimpresion
  }


  ngOnInit() {
  }


  
  Imprimir() {
    this.NitsServices.Cargando()

    this.authService.ApiBlob(this.Constants._APISimuladorCreditosimprimir, this.paraimpresion)
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

  




  GuardarPDF2(buffer){
    var blob = new Blob([buffer], { type: 'application/pdf' })

    if (this.plt.is('cordova')) {
      let filePath = ((this.file.externalRootDirectory) ? this.file.externalRootDirectory : this.file.documentsDirectory)

      this.file.createDir(filePath, 'total-simuladorcreditos', true)
        .then(r => {
          this.file.writeFile(filePath + 'SimuladorCreditos/ImprimirFront', "SimuladorCreditos/ImprimirFront.pdf", blob, { replace: true }).then((fileEntry) => {

            this.fileOpener.open(filePath + 'SimuladorCreditos/ImprimirFront.pdf' + 'SimuladorCreditos/ImprimirFront.pdf', 'application/pdf');

          }).catch((err) => {
            alert(err)
            console.error("Error creating file: " + err);
            throw err;  //Rethrow - will be caught by caller
          });
        })
        .catch((er) => {
          alert(er)
        })
    } else {
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL); 
        //se abre cuando es desde el navegador
    }
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
