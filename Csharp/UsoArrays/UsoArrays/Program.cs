namespace UsoArrays
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // declarar array
            int[] edades = { 15, 27, 19, 80, 21 }; // un array de numeros enteros

            //Console.WriteLine(edades[4]); // mostrar en consola el campo elegido


            /**
             * Arrays implicitos
             * INFERENCIA DE DATOS EN LOS ARRAYS
             */


            var datos = new[] { "juan", "Días", "España" }; // infiere que es una array de tipo String
            var valores = new[] { 15, 28, 35, 75.5, 30.30 }; // infiere que es un arrays de datos double

            Empleados[] arrayEmpleados = new Empleados[3];

            arrayEmpleados[0] = new Empleados("Sara", 20); // crear objeto forma 1
            Empleados Ana = new Empleados("Ana", 21); // crear objeto forma 2
            arrayEmpleados[1] = Ana;
            arrayEmpleados[2] = new Empleados("Gio", 23); // crear objeto forma 1


            // Arrays de tipos o clases anonimas -> Array de Objetos

            var personas = new[]
            {
                new {Nombre="Gio", Edad=22},
                new {Nombre="Ana", Edad=21},
                new {Nombre="Diana", Edad=20}
            };


            // recorrer arrays con for
            //for (int i = 0; i < arrayEmpleados.Length; i++)
            //{
            //    Console.WriteLine(arrayEmpleados[i].getInfo());
            //}

            // recorrer arrays con forEach
            // crear variable del tipo de datos que se desea recorrer, nombre, in, array a recorrer
            foreach (Empleados i in arrayEmpleados)
            {
                Console.WriteLine(i.getInfo());
            }

            // otro ejemplo con el array anonimo "personas"
            foreach (var i in personas)
            {
                Console.WriteLine(i);
            }


        }

        class Empleados
        {
            public Empleados(String nombre, int edad)
            {
                this.nombre = nombre;
                this.edad = edad;
            }

            private String nombre;
            private int edad;

            // metodo de acceso a la información del usuario
            public String getInfo()
            {
                return "Nombre del Empleaqdo: " + nombre + " y la edad del empleado: " + edad;
            }
        }
    }
}
