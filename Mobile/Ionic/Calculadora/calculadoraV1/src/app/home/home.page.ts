import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  // cargar la página
  ngOnInit() {
    this.onLoad(); // cargar la pagina y estilo
  }

  // funcion para cargar la pagina y el estilo
  onLoad() {
    document.addEventListener("ionChange", this.setStyle);
    this.setStyle();
  }

  // funcion para establecer el estilo de los botones
  setStyle() {
    const buttons = document.querySelectorAll("ion-content ion-button");
    buttons.forEach((b: any) => {
      b.expand = "block";
      b.strong = "true";
      b.fill = (document.getElementById("type") as HTMLSelectElement).value;
      b.size = (document.getElementById("size") as HTMLSelectElement).value;
    });
  }

  // funcion para el resultado
  setResult(value: any) {
    document.getElementById("result")!.innerHTML = value;
  }

  // funcion para obtener el resultado
  getResult() {
    return document.getElementById("result")!.innerHTML;
  }

  // funcion para agregar un valor a la calculadora
  add(key: string) {
    const result = this.getResult();
    if (result !== "0" || isNaN(Number(key))) {
      this.setResult(result + key);
    } else {
      this.setResult(key);
    }
  }

  // funcion para calcular
  calc() {
    const result = eval(this.getResult());
    this.setResult(result);
  }

  // funcion para borrar todo
  del() {
    this.setResult("0");
  }

  // funcion para borrar solo el utlimo valor agregado y asi sucesivamente
  back() {
    const result = this.getResult();
    if (result.length > 1) {
      this.setResult(result.slice(0, result.length - 1));
    } else {
      this.setResult("0");
    }
  }
}