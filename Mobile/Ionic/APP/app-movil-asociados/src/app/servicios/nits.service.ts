import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../servicios/constants.service'
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable()
export class NitsService {
  isLoading = false //se crea debido que a veces en el loading entra primero al dismiss generando error y no deja continuar
loading: any

  constructor(
    public loadingCtrl:LoadingController,
    public alerCtrl: AlertController,
    private Constants : ConstantsService,
    public router: Router,
    public file: File,
    public plt: Platform,
    public fileOpener: FileOpener,
  ) { }
    
  async Cargando() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 15000
    }).then(a => {
      a.present().then(() => {
        //a.dismiss()
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    }).catch(e => {
      console.log(e)
      this.CargandoDismiss()
    });
  }

  async CargandoDismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().catch(() => console.log('dismissed'));
  }

  mostrarMensajes(result){
    var data = result;
    var message = {
        //title: '<div class="logoEtidad">&nbsp;&nbsp;<div>',
        //template: ""
    };
    var  datacodigo = ""
    var decrypted
    switch (data[0][0].tipoMensaje) {
      case "A":
        decrypted = CryptoJS.AES.decrypt(data[0][0].Mensaje,this.Constants._secret);
        datacodigo = CryptoJS.enc.Utf8.stringify(decrypted);
      // message.template = datacodigo;
      // $ionicPopup.alert(message);
      if (datacodigo != ""){
        message = datacodigo
        this.AlertMsm(message);
      }
      break;
      case "I":
          // message.template = data[0][0].Mensaje;

           decrypted = CryptoJS.AES.decrypt(data[0][0].Mensaje,this.Constants._secret);
           datacodigo = CryptoJS.enc.Utf8.stringify(decrypted);
          // message.template = datacodigo;
          // $ionicPopup.alert(message);
          if (datacodigo != "")
          {
          message = datacodigo
          this.AlertMsm(message);
        }
          break;
      case "E":

         decrypted = CryptoJS.AES.decrypt(
          data[0][0].Mensaje,
          this.Constants._secret
      );
       datacodigo = CryptoJS.enc.Utf8.stringify(decrypted);
      // message.template = datacodigo;
      // $ionicPopup.alert(message);
      if (datacodigo != "")
      {
      message = datacodigo
      this.AlertMsm(message);
      this.router.navigateByUrl('/loginpage')
    }
      break;
      default:

         decrypted = CryptoJS.AES.decrypt(
          data[0][0].Mensaje,
          this.Constants._secret
      );
       datacodigo = CryptoJS.enc.Utf8.stringify(decrypted);

      if (datacodigo != "")
      {
      message = datacodigo
      this.AlertMsm(message);
    }
      break;

     }


  return data;
  }

  async AlertMsm(Message) {
    const alert = await this.alerCtrl.create({
      header: 'Notificación',
      message: Message,
      buttons: ['OK']
    });
    await alert.present();
  }

  LogIn(){
    localStorage.clear()
    this.router.navigateByUrl('/')
    }

    GuardarPDFSimulacion(buffer){
      var blob = new Blob([buffer], { type: 'application/pdf' })

      if (this.plt.is('cordova')) {
        let filePath = ((this.file.externalRootDirectory) ? this.file.externalRootDirectory : this.file.documentsDirectory)

        this.file.createDir(filePath, 'simulacion', true)
          .then(r => {
            this.file.writeFile(filePath + '/simulacion', "simulacion.pdf", blob, { replace: true }).then((fileEntry) => {

              this.fileOpener.open(filePath + '/simulacion' + '/simulacion.pdf', 'application/pdf');

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
        window.open(fileURL); //se abre cuando es desde el navegador
      }
    }
}
