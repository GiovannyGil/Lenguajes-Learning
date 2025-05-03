import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { NitsService } from 'src/app/servicios/nits.service';

@Component({
  selector: 'app-auxilios-requisitos',
  templateUrl: './auxilios-requisitos.page.html',
  styleUrls: ['./auxilios-requisitos.page.scss'],
})
export class AuxiliosRequisitosPage implements OnInit {
Datos=[]
usuario
correoasesor
mensaje
auxilio
idauxilio

  constructor(
    public authService:AuthService,
    public Constants: ConstantsService,
    public NitsServices:NitsService,
    public alerCtrl:AlertController,
    public router: Router
  ) {
    this.Datos=this.router.getCurrentNavigation().extras.queryParams.data;
    this.correoasesor=this.router.getCurrentNavigation().extras.queryParams.correoasesor;
    this.mensaje=this.router.getCurrentNavigation().extras.queryParams.mensaje;
    this.auxilio=this.router.getCurrentNavigation().extras.queryParams.auxilio;
    this.idauxilio=this.router.getCurrentNavigation().extras.queryParams.id;
    this.usuario=this.router.getCurrentNavigation().extras.queryParams.usuario;
   }

  ngOnInit() {
    var empieza = 0
    var termina = this.Datos.length

    var x = document.createElement("ion-select");

    var option_no = document.createElement("ion-select-option");
    option_no.setAttribute("value", "NO");
    var n = document.createTextNode("NO");
    option_no.appendChild(n);

    var option_si = document.createElement("ion-select-option");
    option_si.setAttribute("value", "SI");
    var s = document.createTextNode("SI");
    option_si.appendChild(s);

    var div = document.getElementById("campos_dinamicos");

    while (empieza >= 0 && empieza < termina) {
      var currentNumber = this.Datos[empieza];
      if (currentNumber.IdparametroAuxiliosApp == this.idauxilio) {
          var item =  document.createElement("ion-item");
          var label = document.createElement("ion-label");
          if (this.Datos[empieza].visualizaEnLaApp == "1") {
              if (this.Datos[empieza].esdeseleccion === "S") {
                  var text = document.createTextNode(
                      this.Datos[empieza].nombrecampo.toLowerCase() + ":"
                  );

                  var new_select = x.cloneNode();
                  var new_option_si = option_si.cloneNode();
                  var new_option_no = option_no.cloneNode();

                  new_select.appendChild(new_option_no);
                  var n = document.createTextNode("NO");
                  new_option_no.appendChild(n);
                  new_select.appendChild(new_option_si);
                  var s = document.createTextNode("SI");
                  new_option_si.appendChild(s);

                  new_select['setAttribute']("placeholder", "Seleccione");
                  new_select['setAttribute']("style", "max-width: max-content; color: #dbd2d2;");
                  new_select['setAttribute'](
                      "id",
                      this.Datos[empieza].nombrecampo.toLowerCase()
                  );
                  new_select['setAttribute']("name", "campo" + [empieza]);
                  div.appendChild(item)
                  item.appendChild(label)
                  label.appendChild(text)
                  item.appendChild(new_select)
              } else {
                  var input = document.createElement("ion-input");
                  var text = document.createTextNode(
                      this.Datos[empieza].nombrecampo.toLowerCase()
                  );
                  input.setAttribute("Placeholder", "Ingrese datos");
                  input.setAttribute("name", "campo" + [empieza]);
                  input.setAttribute(
                      "id",
                      this.Datos[empieza].nombrecampo.toLowerCase()
                  );
                  div.appendChild(item);
                  item.appendChild(label);
                  label.appendChild(text);
                  item.appendChild(input);   
              }
          }
      }
      empieza++;
    }
  }

  uploadFile = function(){
    var datausu = [];

            for (var i = 0; i < this.Datos.length; i++) {
                if (this.Datos[i].IdparametroAuxiliosApp == this.idauxilio) {
                    var nombrecampo = this.Datos[i].nombrecampo.toLowerCase();
                    var idCampo = document.getElementById(nombrecampo);
            
                        var pro = idCampo['value'];

                    var requ = { Campo: this.Datos[i].nombrecampo, Valor: pro };

                    datausu.push(requ);
                }
            }
            
            var file = document.getElementById("file").firstChild['files'];

            if (file.length > 0) {
                // create a FormData object which will be sent as the data payload in the
                // AJAX request
                var formData = new FormData();
                // loop through all the selected files and add them to the formData object

                for (var i = 0; i < file.length; i++) {
                    var file = file[i];
                    var name = file.name;
                    // add the files to formData object for the data payload
                    formData.append("uploads[]", file, name);
                }
            }

            var url =
             "https://fecsa.corona.com.co:8443/api/upload?usuario=" +
            //"http://138.121.15.30:3535/api/upload?usuario=" +
            this.usuario +
            "&namefile=" +
            name +
            "&mensaje=" +
            this.mensaje +
            "&emailasesor=" +
            this.correoasesor +
            "&auxilio=" +
            this.auxilio +
            "&dataUsu=" +
            JSON.stringify(datausu);

            

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.onload = function (e) {
                if (this.status == 200) {
                    alert("Solicitud enviada");
                } else { 
                    alert(
                        "No se pudo realizar la solicitud por favor hable con su Fondo de empleados."
                    );
                }
            };
            xhr.send(formData);
  }

}
