// See https://aka.ms/new-console-template for more information
using System;

// declarar el namespace
namespace CSharpHelloWord{
// Declarar un clase
    class HelloWorld { 
        // declarar el main -> metodo(principal)
        static void Main(string[] args){
            Console.WriteLine("Hello, World!");
            /*
            comentario
            de varias 
            lineas
            */

            // DATOS PRIMITIVOS

            // varible de cadena = tipo de dato (string) nombre y valor
            string  myString = "cadena de texto";
            Console.WriteLine(myString);

            // variable boolean = tipo de dato (bool) nombre y valor = (true/false)
            bool myBool = true;
            Console.WriteLine(myBool);

            // variable numerico entero = tipo de dato (int) nombre y valor
            int myInt = 7;
            Console.WriteLine(myInt);

            // varaible numerico decimal = tipo de dato (double) nombre y valor
            double myDouble = 6.5;

            Console.WriteLine(myDouble);

            // varaible numerico decimal = tipo de dato (float) nombre y valor con una f al final
            float myFloat = 6.5f;
            Console.WriteLine(myFloat);

            // imprimir en consola con concatenacion
            Console.WriteLine($"El valor de mi entero es: {myInt} y mu boolean es: {myBool}");

            // CONSTANTE -> palabra recervada const + tipo de dato + nombre = valor
            const string myConst = "mi constante";


            // ESTRUCTURAS

            // ARRAY -> Listado de componenetes
            // var + nombre = new + tipo de dato que será el array +[] + {valores}
            var myArray = new string[] {"Brasil", "Colombia", "Argentina"};
            // imprimir el valor del componente en la posicion 1
            System.Console.WriteLine(myArray[1]);

            // Dicionario -> pares de valores {"propiedad":valor} -> se le debe pasar el tipo de dato que sera tanto la propiedad como el valor
            // var + nombre = new Dictionary<tipo dato -> propiedad, tipo datp valor> {{"propiedad"; valor} N CANTIDAD }
            var myDictionary = new Dictionary<string,int>{
                {"Gio":22},
                {"Alejandra":20},
                {"Sofia":21},
                {"Andres":19}
            };

            // los set, son parecidos a los arrays con una diferencia (estructuras desordenadas)
            var mySet = new HashSet<string>{"Brasil", "Colombia", "Argentina"}

            // Tuplas, no se muestra individual, se recorren
            // var + nombre =  ("elementos a guardar")
            var myTuple = ("Brasil", "Colombia", "Argentina");


            // BUCLES

            // for -> sirve para recorrer estruturas, cantidades o valores
            for (int index = 0; index < 10; index++){
                System.Console.WriteLine(index);
                // imprime del 0 al 9 = un total de 10 bueltas o recorre el bucle 10 veces
            }


            // foreach -> sirve para recorrer estructuras formadas
            foreach (var myItem in myArray){
                System.Console.WriteLine(myItem);
                // me muestra los valores del array, uno por cada vez que recorra el array, cuando no hay más valores, para el bucle
            }

            // Condicionales -> de decide si continua o no ==> IF
            if (myInt == 11){
                System.Console.WriteLine("EL valor es 11");
            } else if (myInt == 7){
                System.Console.WriteLine("El valor es 7");
            } else {
                System.Console.WriteLine("El valor no es 11 ni 7");
            }


            // llamar funcion
            MyFunction();
            System.Console.WriteLine(MyFunctionReturn(5));;
        }
        // funciones (void = vacia / que retorna = tipo de dato)
        // un funcion es una porcion de codigo que se referencia y/0 se puede llamar desde otros lugares del código para no repetir código

        static void MyFunction(){
            System.Console.WriteLine("Una Función");
        }
        // las funciones pueden recibir parametros (son valores para que las funciones trabajen con ellos)
        
        // si la funcion retorna, se le debe pasar el tipo de dato que retornará, que debe ser el mismo que recibe
        static int MyFunctionReturn(int param){
            return 10 + param;
        }
        
    }
}

