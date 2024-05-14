namespace UsoArrays2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // ARRAYS COMO PARAMETROS ...

            // declarar el array (NO IMPLICITO "TAMAÑO ESTABLECIDO")
            int [] numeros = new int[4];
            numeros[0] = 7;
            numeros[1] = 11;
            numeros[2] = 5;
            numeros[3] = 3;

            //llamar la funcion/metodo
            ProcesaDatos(numeros); // incrementa

            // recorrer el array
            foreach (int i in numeros)
            {
                // Console.WriteLine(i); // imprime los nuevos valores = incrementados en 10
            }


            // crear un array, para llamar al metodo
            int[] arrayElementos = LeerDatos();
            Console.WriteLine("imprimiendo desde el main");

            foreach (int i in arrayElementos) Console.WriteLine(i);//ecorrer el array de elementos una vez rellenado y terminado
        }

        // el array como parametro, tipo [para indicar que es un array] y nombre del array
        static void ProcesaDatos(int[] datos)
        {
            // usar ciclo for para incrementar en 10 cada valor del array
            for (int i = 0; i < datos.Length; i++)
            {
                // agregar 10 a cada valor
                datos[i] += 10;
            }
        }

        static void TipoNumero(int[] datos)
        {
            foreach (int i in datos)
            {
                if (i/1 == i & i/i == 1)
                {
                    Console.WriteLine(i + " es un numero primo");
                }
                else
                {
                    Console.WriteLine(i + " no es un numero primo");
                }

            }
        }
        // metodo para leer array y devolver un array
        static int[] LeerDatos()
        {
            Console.WriteLine("¿Cuantos elementos deseas que tenga el array?");

            string respuesta = Console.ReadLine(); // pasar un valor por consola
            int numElemento = int.Parse(respuesta); // pasar el valor de string a int
            int[] datos = new int[numElemento]; // array del valor pasado por consola

            // recorrer un clico for la cantida de veces pasado en el valor por consola
            for (int i = 0; i < numElemento; i++)
            {
                Console.WriteLine($"Introduce el dato para la posicion {i}");
                respuesta=Console.ReadLine(); // ingresar el valor de la posicion {i}
                int datosElementos = int.Parse(respuesta); // pasar el valor de string a int

                // rellenar las posiciones por cada vuelta del buble
                datos[i]=datosElementos;
            }
            // devolver el array datos
            return datos;
        }


    }
}
