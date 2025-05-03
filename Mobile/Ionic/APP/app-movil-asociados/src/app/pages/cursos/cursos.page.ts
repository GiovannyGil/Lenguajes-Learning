import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import {Platform} from '@ionic/angular'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  select=[]
  input: {
    curso?: string;
  } = {}
  preguntas
  archivos
  obj=null

  constructor(
    public authService:AuthService,
    public Constants: ConstantsService,
    public NitsServices:NitsService,
    public alerCtrl:AlertController,
    public file: File,
    public plt: Platform,
    public fileOpener: FileOpener,
  ) { }

  ngOnInit() {
    var traerdatos={
      params:{
      quehace:'concursos'
      }
    }
    this.authService.ApiSendData(this.Constants._APIcursos, traerdatos).subscribe(data => {
      if(data[0][0].Codigo=="401"){
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.select['cursos']=data[0]
        },
        err => {
          console.log(err)
         });
  }

  buscardatos(id){
    var curso = id
    var termina = this.select['cursos'].length
    var empieza = 0

    while (empieza >= 0 && empieza < termina) {


           if (this.select['cursos'][empieza].nombre == curso) {
               var paramtraerdatos = {
                 params:{
                   quehace: 'preguntasadjuntos',
                   idcurso: this.select['cursos'][empieza].idCursosapp
                  }
               }

               this.authService.ApiSendData(this.Constants._APIcursos, paramtraerdatos).subscribe(data => {
                if(data[0][0].Codigo=="401"){
                  this.NitsServices.mostrarMensajes(data)
                  localStorage.clear()
                  this.NitsServices.LogIn()
                  return
                }

                if (data[0][0].length > 0){

                   if (data[0][0][0].tipo == "O") {

                    var div = document.getElementById("campos_dinamicos");
                    div.innerHTML = ""

                    for (var i = 0; i < data[0][0].length; i++) {

                    var item = document.createElement("ion-item");
                    div.appendChild(item);

                    var label = document.createElement("ion-label");
                    div.appendChild(label);
                    label.setAttribute("style","overflow: visible;");

                    var span = document.createElement("span");
                    div.appendChild(span);

                   var input = document.createElement("ion-input");
                   input.setAttribute("placeholder", "Respuesta");
                   input.setAttribute("ngModel", "input.campo" + [i]);
                   var text = document.createTextNode(
                       data[0][0][i].pregunta.toLowerCase()
                   );

                   input.setAttribute("name", "campo" + [i]);
                   input.setAttribute(
                       "id",
                       data[0][0][i].pregunta.toLowerCase()
                   );
                  item.appendChild(label)
                  label.appendChild(span)
                  span.appendChild(text)
                  // item.appendChild(input)

    // CREAR EL SELECT
                  var salto1 = document.createElement("br");
                  div.appendChild(salto1);
                  var item2 = document.createElement("ion-item");
                  div.appendChild(item2);

                  this.select['pregunta'] = data[0][0][i].codigopregunta

                       var array = [];
                       //Create array of options to be added
                       for (var a = 0; a < data[2][0].length; a++) {

                           var codigopregun = data[2][0][a].codigopregunta
                           var Respuesta = data[2][0][a].respuesta

                           if (codigopregun === this.select['pregunta']) {
                               array.push(Respuesta)
                           }

                       }

                 var selectList = document.createElement("ion-select");
                      selectList.id = "mySelect";
                      selectList.setAttribute("name", "campo" + [i]);
                      selectList.setAttribute(
                          "id",
                          data[0][0][i].pregunta.toLowerCase()
                      );
                      div.appendChild(selectList);
                //Create and append the options
                           for (var e = 0; e < array.length; e++) {
                               var option = document.createElement("ion-select-option");
                               option.value = array[e];
                               option.textContent = array[e];
                               selectList.appendChild(option);
                           }
                 selectList.setAttribute("placeholder", "Seleccione");
                 selectList.setAttribute("style", "max-width: max-content; color: #dbd2d2;");
                 selectList.setAttribute("ngModel", "input.campo" + [i]);
                 var text2 = document.createTextNode(
                     data[0][0][i].pregunta.toLowerCase()
                 );

                 selectList.setAttribute("name", "campo" + [i]);
                 selectList.setAttribute(
                     "id",
                     data[0][0][i].pregunta.toLowerCase()
                 );
                item2.appendChild(selectList)
                 }
                  this.preguntas = data[0][0]
                  this.archivos = data[1][0]

                   } else {

                       var div = document.getElementById("campos_dinamicos");

                       div.innerHTML = ""
                       for (var i = 0; i < data[0][0].length; i++) {

                            var item = document.createElement("ion-item");
                            div.appendChild(item);

                            var label = document.createElement("ion-label");
                            div.appendChild(label);
                            // label.setAttribute("style","overflow: visible;");
                            label.setAttribute("style","white-space: unset; overflow: visible;");
                            

                            var span = document.createElement("span");
                            div.appendChild(span);
                            span.setAttribute("style","color: black;" )

                           var input = document.createElement("ion-input");
                           input.setAttribute("placeholder", "Respuesta");
                           input.setAttribute("style", "color: black;" )
                           input.setAttribute("ngModel", "input.campo" + [i]);
                           var text = document.createTextNode(
                               data[0][0][i].pregunta.toLowerCase()
                           );

                           input.setAttribute("name", "campo" + [i]);
                           input.setAttribute(
                               "id",
                               data[0][0][i].pregunta.toLowerCase()
                           );

                          item.appendChild(label)
                          label.appendChild(span)
                          span.appendChild(text)
                          item.appendChild(input)
                       }

                       this.preguntas = data[0][0]
                       this.archivos = data[1][0]
                   }
               }else {

                   var div = document.getElementById("campos_dinamicos");
                   div.innerHTML = ""
                   this.archivos = ""
                  this.NitsServices.AlertMsm("Este curso no posee preguntas por favor verifique con el fondo de empleados...");
                  return false;

               }

                  },
                  err => {
                    console.log(err)
                   });

           }
           empieza++
       }
  }

  Terminar(curso){
    var datoscursos = [];
    for (var i = 0; i < this.preguntas.length; i++) {
        var nombrecampo =this.preguntas[i].pregunta.toLowerCase();
        var idCampo = document.getElementById(nombrecampo);
        var pro = idCampo['value'];
        var requ = { Campo: nombrecampo, Valor: pro };

        datoscursos.push(requ);
    }

    var enviarrespuestas = {
      params:{
      cedula: localStorage.getItem("operador"),
      nombrecurso: curso,
      respuestas: datoscursos,
      quehace: 'solicita'
     }
    }
    this.authService.ApiSendData(this.Constants._APIcursos, enviarrespuestas).subscribe(data => {
      if(data[0][0].Codigo=="401"){
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.NitsServices.mostrarMensajes(data)
        },
        err => {
          console.log(err)
         });
  }

  downloadFile(ruta) {

    var paramimprimir = {
        quehace: 'Descargar',
        ruta: ruta
    }
    this.authService.ApiBlob(this.Constants._APIdescargarcursos, paramimprimir).subscribe(data => {
      this.AbrirArchivos(data)
        },
        err => {
          console.log(err)
         });

}

AbrirArchivos(data){
  if (this.plt.is('cordova')) {

      let filePath = ((this.file.externalRootDirectory) ? this.file.externalRootDirectory : this.file.documentsDirectory)

      this.file.createDir(filePath, 'certificados', true)
        .then(r => {
          this.file.writeFile(filePath + '/certificados', "output.pdf", data, { replace: true }).then((fileEntry) => {

            this.fileOpener.open(filePath + '/certificados' + '/output.pdf', 'application/pdf');

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
    var blob = new Blob([data], {
      type: "application/pdf"
     });
  var url = window.URL.createObjectURL(blob);
  window.open(url);
  }
}

}
