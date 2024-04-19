namespace Proyecto_Herencia_V1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // instanciar ejemplos de las clases que heredan de Mamifero
            Caballo caballo = new Caballo("Juan"); // instanciar caballo y pasarle el nombreCaballo por parametro
            Humano humano = new Humano("Gio"); // instanciar humano y pasarle el nombreHumano por parametro
            Gorilla gorilla = new Gorilla("Copito");  // instanciar gorilla y pasarle el nombreGorilla por parametro

            //humano.getNombre();

            // principio de sustitucion

            // un caballo es siempre un mamifero
            Mamifero animal = new Caballo("Miguel");
            // dentro de un objeto de tipo Mamifero se puede almacenar un objeto de tipo caballo

            Mamifero persona = new Humano("Sara");
            Mamifero mono = new Gorilla("Cesar");

            // al ser de tipo Mamifero, solo pueden usar los metodos de la clase mamifero y no de las clases Humano, Caballo y Gorilla


            // crear array para almacenar los mamiferos

            Mamifero[] AlmacenAnimales = new Mamifero[3];

            AlmacenAnimales[0] = caballo;
            AlmacenAnimales[1] = humano;
            AlmacenAnimales[2] = gorilla;

            // AlmacenAnimales[2].getNombre();

            for (int i = 0; i < AlmacenAnimales.Length; i++)
            {
                // AlmacenAnimales[i].Pensar();
            }

            Ballena ballena = new Ballena("Wally");
            ballena.getNombre();
            ballena.Nadar();

            // instanciar una interface para "usar" sus metodos
            IMamiferosTerrestres Icaballo = caballo;
            ISaltoConPatas IsaltoPatas = caballo;

            caballo.getNombre();
            // mostrar la cantidad de patas, usando su interface instanciada
            Console.WriteLine($"Numero de Patas del Caballo: {Icaballo.numeroPatas()}");
            // mostrar la cantidad de patas que usa el caballo para saltar
            Console.WriteLine($"El caballo usa {IsaltoPatas.numeroPatas()} para saltar");



            // instanciar a la clase largartija
            Lagartija largartija = new Lagartija("Juancho");

            largartija.getNombre();
            largartija.Respirar();

            // mostrar la info de humano para comparar con lagartija
            humano.getNombre();
            humano.Respirar();

        }
    }

    // crear interface para que se use en las clases, solo metodos, no variables, ni contructor, ni destructor, ni metodo de acceso, no se crean clases interfaces dentro de una interface
    interface IMamiferosTerrestres
    {
        // crear los metodos que deben desarrolladar las clases que hereden la interface

        // sin modificador de acceso y llaves == solo se definen
        int numeroPatas();
    }

    interface IAnimalesYDeportes
    {
        string tipoDeporte();
        Boolean esOlimpico();
    }

    interface ISaltoConPatas
    {
        // Boolean Saltar();
        int numeroPatas();
    }

    // crear clase abstracta, una clase es abstracta cuando uno de sus metodo es abstracto
    abstract class Animales
    {
        public void Respirar()
        {
            Console.WriteLine("Soy Capaz de RESPIRAR");
        }
        public abstract void getNombre(); // crear metodo abstracto, obliga a que sea definia como en una interface
    }

    class Lagartija: Animales
    {

        public Lagartija(String nombre)
        {
            nombreReptil = nombre;
        }

        public override void getNombre() // sobre escribir o desarrollar el metodo abstracto heredado de la clase abstracta
        {
            Console.WriteLine("El nombre del Reptil es: " + nombreReptil);
        }

        private String nombreReptil;
    }

    class Mamifero: Animales
    {

        // contructor para la clase Mamifero
        public Mamifero(String nombre)
        {
            // el nombre de servivo, es lo que le llega a el contructor por parametro, desde la instanciacion
            nombreSerVivo = nombre;
        }

        // darle el virtual, especifica que cada subclase pueda tener un metodo pensar -> modificado
        public virtual void Pensar()
        {
            Console.WriteLine("Pensamiento Básico instintivo");
        }

        public void CuidarCrias()
        {
            Console.WriteLine("Ciudo mis crías hasta que se valgan por si solas");
        }

        public override void getNombre() // sobre escribir/desarrollar el metodo heredado de la clase abstracta
        {
            Console.WriteLine("El nombre del Mamifero es: " + nombreSerVivo);
        }

        private String nombreSerVivo;
    }

    // crear clase caballo que hereda de la clase mamifero (HERENCIA -> METODOS Y PROPIEDADES)
    class Caballo : Mamifero, IMamiferosTerrestres, IAnimalesYDeportes, ISaltoConPatas
    {
        // crear constructor de caballo, pasando por parametro el nombre caballo y a la base (nombrecaballo se pasa por parametro en la instanciacion)
        public Caballo(String nombreCaballo) : base(nombreCaballo) // base lleva el nombre de caballo al contructor de la clase padre "Mamifero"
        {

        }
        public void Galopar()
        {
            Console.WriteLine("Soy capaz de galopar");
        }

        // definir el valor del metodo de la interface "MAMIFEROSTERRESTRE
        int IMamiferosTerrestres.numeroPatas()
        {
            return 4;
        }

        public string tipoDeporte()
        {
            return "Carreras";
        }

        public Boolean esOlimpico()
        {
            return true;
        }

        // definir metodo de la interface salto con patas
        int ISaltoConPatas.numeroPatas()
        {
            return 2;
        }

    }

    // crear clase Humano que hereda de la clase mamifero (HERENCIA -> METODOS Y PROPIEDADES)
    class Humano : Mamifero, IAnimalesYDeportes
    {
        public Humano(String nombreHumano) : base(nombreHumano)
        {

        }

        // polimorfismo, tengo un metodo pensar y heredo un metodo pensar
        // cuando se use, llamará este y ocultara el de la clase padre, pero se pueden diferencias por el return/void o cantidad parametros
        // tambien poniedo "virtual" -> metodo igual pero modificado (override)
        public sealed override void Pensar()
            // sealed impide que futuras clases que hereden este metodo lo puedan sobre escribir
        {
            Console.WriteLine("Soy capaz de pensar");
        }

        public string tipoDeporte()
        {
            return "Futbol";
        }

        public Boolean esOlimpico()
        {
            return true;
        }

    }

    // crear clase Gorilla hereda de la clase mamifero (HERENCIA -> METODOS Y PROPIEDADES)
    // sealed impideqie futuras clases hereden esta clase
    sealed class Gorilla : Mamifero, IMamiferosTerrestres
    {

        public Gorilla(String nombreGorilla) : base(nombreGorilla)
        {

        }

        public void Trepar()
        {
            Console.WriteLine("Soy capaz de pensar");
        }

        public int numeroPatas()
        {
            return 2;
        }

    }

    //class Chimpance : Gorilla
    //{
    //    public Chimpance(String nombreChimpance) : base(nombreChimpance)
    //    {

    //    }
    //}

    class Ballena : Mamifero
    {
        public Ballena(String nombreBallena) : base(nombreBallena)
        {

        }

        public void Nadar()
        {
            Console.WriteLine("Puedo Nadar");
        }
    }
}