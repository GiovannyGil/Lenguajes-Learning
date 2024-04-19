function Greet(name:string){
    console.log(`Hello World!, ${name.toUpperCase()} !!!!`);
}


Greet("Gio");


function getNumber():number{ // en algunos caso se debe especificar el tipo de dato que va a retornar
    return Math.floor(Math.random()* 100);
}
console.log(getNumber());


function printPosition(position:{lat:number, long:number}){ // funcion con objetos
    console.log(`latitud y longitud: es lat: ${position.lat} long: ${position.long}`);
}
printPosition({lat:3,long:5});