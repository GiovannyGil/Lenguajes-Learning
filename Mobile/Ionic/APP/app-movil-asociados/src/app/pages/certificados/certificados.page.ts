import { Component } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular'
import { NavigationEnd, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';

enum TiposCertificados {
  AFILIA = "AFILIA",
  AFIDEU = "AFIDEU",
  INGRET = "INGRET",
}

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.page.html',
  styleUrls: ['./certificados.page.scss'],
})
export class CertificadosPage {
  quegenera

  datos: { CedulaAsociado: string, Tipo: TiposCertificados, ano?: number } = {
    CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("id"), this.Constants._secret).toString(),
    Tipo: TiposCertificados.AFILIA,
  }

  constructor(
    public Constants: ConstantsService,
    public NitsServices: NitsService,
    public authService: AuthService,
    public file: File,
    public plt: Platform,
    public fileOpener: FileOpener,
    public router: Router
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.quegenera = this.router.getCurrentNavigation().extras.queryParams
      }
    });
  }



  Descargar() {
    this.NitsServices.Cargando()

    if (this.quegenera === 'afiliacion') {
      this.datos.Tipo = TiposCertificados.AFILIA
    } else if (this.quegenera === 'deuda') {
      this.datos.Tipo = TiposCertificados.AFIDEU
    } else if (this.quegenera === 'retencion') {
      this.datos.Tipo = TiposCertificados.INGRET
      this.datos.ano = new Date().getUTCFullYear() - 1;
    }

    this.authService.ApiBlob(this.Constants._APIcertificados, this.datos)
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

      // this.file.writeFile(filePath, temporalName, blob, { replace: true, append: true }).then((fileEntry) => {
      //   this.fileOpener.open(filePath + temporalName, 'application/pdf');
      // }).catch((err) => {
      //   alert(err.toString())
      //   console.error("Error creating file: " + err);
      //   throw err;  //Rethrow - will be caught by caller
      // });

      this.file.checkDir(this.file.externalApplicationStorageDirectory, 'certificados')
        .then(_ => {
          this.file.writeFile(this.file.externalApplicationStorageDirectory + 'certificados/', temporalName, blob).then(response => {
            this.fileOpener.open(this.file.externalApplicationStorageDirectory + 'certificados/' + temporalName, 'application/pdf');
          }).catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          this.file.createDir(this.file.externalApplicationStorageDirectory, 'certificados', false).then(result => {
            this.file.writeFile(this.file.externalApplicationStorageDirectory + 'certificados/', temporalName, blob).then(response => {
              this.fileOpener.open(this.file.externalApplicationStorageDirectory + 'certificados/' + temporalName, 'application/pdf');
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

      //se abre cuando es desde el navegador
  }


}
