const userName = 'Gio';

//tipos basicos
let myTypeString: string = 'Gio';
let myTypeNumber: number = 21;
let myTypeBoolean: boolean = true;
 

// ARRAYS
let arrayNumber : number[] = [1,2,3];
let arrayNumber2 : Array<number> = [4,5,6];

let arrayString : string[] = ['Hola', 'Hi', 'Hello'];
let arrayAny : any[] = [1,2,3,4,5,6,'Hola', 'Hi', 'Hello']; // any cualquier tipo

// TUPLAS, da las posiciones exacatas de los tipos de datos
let tuplaPlayers: [string, number, boolean] = ['Gio', 21, true];

// TUPLA ARRAY
let Players : [number, string][];
Players = [ // una array hechos de tuplas
    [1,'G'],
    [2,'F']
]

//INFERENCIA DE TIPOS
// recibe un tipo de dato, segun lo que almacene la variable
let myVariable;
let myVariable1:string;
let myVariable2='Hola Mundo';

// COMPOSICION DE TIPOS
/// UNION = una variable puede ser de dos o más tipos
let myVariableU:string|never|null; // una variable de varios tipos de datos