"use strict";
//CLASSS
class Persona {
    constructor() {
        this.city = "Medellín"; // es posible usarla desde otras clases y metodo, solo si tiene Herencia "Extends"
        this.country = "Colombia"; // solo se puede acceder desde la misma clase y sus metodos 
    }
    greett() {
        console.log('Hello!!!!!111');
    }
}
class Employees2 extends Persona {
    // Atributos
    // private id: number;
    // private name: string;
    // private dept: string;
    constructor(id, name, dept) {
        // this.id = id;
        // this.name = name;
        // this.dept = dept;
        super(); // /// // ----------------------- 
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.showInfo();
    }
    //METODOS
    showInfo() {
        console.log(`${this.name} - ${this.dept}, ${this.city}`);
    }
}
const emp = new Employees2(1, 'Gio', '23xc');
