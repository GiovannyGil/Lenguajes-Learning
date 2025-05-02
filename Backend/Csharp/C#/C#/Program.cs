using System;
using C_.Models;


Bebida bebida = new Bebida("Coca Cola", 1000); // instanciar -> creo un objeto, bebida, tipo bebida (se le debe dar cono argumento, los valores establecidos en el contructor) -> (nombre, cantidad)

bebida.Beberse(500); // llamo al metodo beberse, y le digo que se bebio 500
Console.WriteLine(bebida.Cantidad); // mostrar por consola el resultado del metodo pasando como parametro la cantidad