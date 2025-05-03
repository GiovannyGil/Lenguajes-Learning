import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import {ConstantsService} from '../../servicios/constants.service';
import {NitsService} from '../../servicios/nits.service'
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-imagenyfrase',
  templateUrl: './imagenyfrase.page.html',
  styleUrls: ['./imagenyfrase.page.scss'],
})
export class ImagenyfrasePage implements OnInit {
  myForm: FormGroup;
  currentIndex=0
  input={
    url:'',
    Frase:''
  }
  images

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private Constants: ConstantsService,
    public  NitsServices: NitsService,
    private authService: AuthService,
  ) {
    this.myForm = this.fb.group({
      Frase: ['', [Validators.required, Validators.pattern('[a-zA-Z 0-9/*+.-]*]*')]]
    })
  }

  ngOnInit() {
    var paramconsultar={
      Operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador:localStorage.getItem("esoperador")
    }
    this.authService.ApiSendData(this.Constants._APIBancoImagenes, paramconsultar).subscribe(data => {
    if(data[0].length>0){
      if(data[0][0].Codigo=="401"){
        this.NitsServices.mostrarMensajes(data)
        localStorage.clear()
        this.NitsServices.LogIn()
        return
      }
      this.images = data[0].reduce(function(array, next) {
        array.push(next.img);
        return array;
    }, []);
      this.input.url = this.images[0];
      this.input.Frase=data[0][0].frase
  }
    }, err => {
      console.log(err)
    });
  }

  nextImage(){
    this.currentIndex =
    this.currentIndex === this.images.length - 1
        ? 0
        : this.currentIndex + 1;
    this.input.url = this.images[this.currentIndex];
  }

  backImage(){
    this.currentIndex =
    this.currentIndex === 0
        ? this.images.length - 1
        : this.currentIndex - 1;
    this.input.url = this.images[this.currentIndex];
  }

  Guardar(){
    var paramguardar={
      Operador:CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      esoperador:localStorage.getItem("esoperador"),
      IMAGEN: this.input.url,
      frase: this.input.Frase
    }
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIguardarImagenes, paramguardar).subscribe(data => {
    this.NitsServices.CargandoDismiss()
    if(data[0][0].Codigo=="401"){
      this.NitsServices.mostrarMensajes(data)
      localStorage.clear()
      this.NitsServices.LogIn()
      return
    }
      this.NitsServices.mostrarMensajes(data)
    }, err => {
      this.NitsServices.CargandoDismiss()
      console.log(err)
    });
  }


}
