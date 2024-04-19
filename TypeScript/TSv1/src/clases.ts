//CLASSS
class Persona {
    protected city = "Medellín"; // es posible usarla desde otras clases y metodo, solo si tiene Herencia "Extends"
    private country = "Colombia" // solo se puede acceder desde la misma clase y sus metodos 
    constructor(){}
    greett(){
        console.log('Hello!!!!!111');  
    }
}
class Employees2 extends Persona {
    // Atributos
    // private id: number;
    // private name: string;
    // private dept: string;

    constructor(private readonly id:number,private name:string,private dept:string){
        // readonly = el elemento es de solo lectura, no se puede modificar ...
        // this.id = id;
        // this.name = name;
        // this.dept = dept;
        super(); // /// // ----------------------- 
        this.showInfo();
    }
    //METODOS
    private showInfo(): void { // funcion o metodo
        console.log(`${this.name} - ${this.dept}, ${this.city}`);
    }
} 

const emp = new Employees2(1,'Gio', '23xc');
