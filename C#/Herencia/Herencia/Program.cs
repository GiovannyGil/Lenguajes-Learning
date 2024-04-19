using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Herencia
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // instanciar ejemplos de las clases que heredan de Mamifero
            Caballo caballo = new Caballo("Juan"); // instanciar caballo y pasarle el nombreCaballo por parametro
            Humano humano = new Humano("Gio"); // instanciar humano y pasarle el nombreHumano por parametro
            Gorilla gorilla = new Gorilla("Copito");  // instanciar gorilla y pasarle el nombreGorilla por parametro

            humano.getNombre();

        }
    }


    class Mamifero
    {

        // contructor para la clase Mamifero
        public Mamifero(String nombre)
        {
            // almacernar el nombre pasado por parametro y reemplazar el nombre ser vivo
            nombreSerVivo = nombre;
        }

        public void Respirar()
        {
            Console.WriteLine("Soy Capaz de RESPIRAR");
        }

        public void CuidarCrias()
        {
            Console.WriteLine("Ciudo mis crías hasta que se valgan por si solas");
        }

        public void getNombre()
        {
            Console.WriteLine("El nombre del servivo es: " + nombreSerVivo);
        }

        private String nombreSerVivo;
    }

    // crear clase caballo que hereda de la clase mamifero (HERENCIA -> METODOS Y PROPIEDADES)
    class Caballo : Mamifero
    {
        // crear constructor de caballo, pasando por parametro el nombre caballo y a la base (nombrecaballo se pasa por parametro en la instanciacion)
        public Caballo(String nombreCaballo):base(nombreCaballo) // base lleva el nombre de caballo al contructor de la clase padre "Mamifero"
        {

        }
        public void Galopar()
        {
            Console.WriteLine("Soy capaz de galopar");
        }
    }

    // crear clase Humano que hereda de la clase mamifero (HERENCIA -> METODOS Y PROPIEDADES)
    class Humano : Mamifero
    {
        public Humano(String nombreHumano):base(nombreHumano)
        {

        }

        public void Pensar()
        {
            Console.WriteLine("Soy capaz de pensar");
        }
    }

    // crear clase Gorilla hereda de la clase mamifero (HERENCIA -> METODOS Y PROPIEDADES)
    class Gorilla : Mamifero
    {

        public Gorilla(String nombreGorilla) : base(nombreGorilla)
        {

        }

        public void Trepar()
        {
            Console.WriteLine("Soy capaz de pensar");
        }
    }

}
