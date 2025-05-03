import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConstantsService } from 'src/app/servicios/constants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagos-nomina',
  templateUrl: './pagos-nomina.page.html',
  styleUrls: ['./pagos-nomina.page.scss'],
})
export class PagosNominaPage implements OnInit {
  myForm: FormGroup
  input: {
    ano?: string;
    mes?: string;
  } = {}

  select: {
    ano?: [{ ano: string }];
    mes?: string;
  } = {}
  meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  resultado = []

  constructor(
    public authService: AuthService,
    public Constants: ConstantsService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      anoSelected: ['', [Validators.required]],
      mesSelected: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    var paratraer = {
      cedulasociado: "",
      ano: "",
      mes: "",
      fecha: "S"
    };
    this.authService.ApiSendData(this.Constants._APIPagoNomina, paratraer).subscribe(data => {
      this.select['ano'] = data[0];
      this.select['mes'] = data[0];
      this.input['ano'] = data[0][1].ano.toString();
      this.input['mes'] = data[0][1].mes.toString();
    }, err => {
      console.log(err)
    });
  }

  Ver() {
    var paramostrar = {
      cedulasociado: localStorage.getItem("operador"),
      ano: this.input['ano'],
      mes: this.input['mes'],
      fecha: "N"
    };
    this.authService.ApiSendData(this.Constants._APIPagoNomina, paramostrar).subscribe(data => {
      this.resultado = data[0]
      if (this.resultado.length <= 0) {
        alert("No cuenta con pagos realizados en la fecha seleccionada")
        this.resultado = []
      }
      console.log(this.resultado)
    }, err => {
      console.log(err)
    });
  }
}
