namespace PropiedadesAcceso
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Empleado Juan = new Empleado("Juan");

            Juan.SALARIO = 1200;

            //Juan.SALARIO += 500;

            Console.WriteLine("el salario del empleado es: " + Juan.SALARIO);
        }
    }

    class Empleado
    {
        public Empleado(string nombre)
        {
            this.nombre = nombre; // la propiedad nombre de la clase es igual al nombre pasado por parametro
        }

        //public void setSalario(double salario)
        //{
        //    if (salario < 0)
        //    {
        //        Console.WriteLine("El salario no puede ser negativo, se asignara 0 como salario");

        //        this.salario = 0;
        //    }
        //    else
        //    {
        //        this.salario = salario;
        //    }
        //}

        //public double getSalario()
        //{
        //    return salario;
        //}


        private double EvaluaSalario(double salario)
        {
            if (salario < 0) return 0;
            else return salario;
        }

        // CREACION DE LA PROPIEDAD / PROPERTIE -> en MAYUSCULA SOSTENIDA

        //public double SALARIO
        //{
        //    get { return salario; } 
        //    set { this.salario = EvaluaSalario(value); }
        //}


        // usar LAMBDA
        public double SALARIO
        {
            get => this.salario;
            set => this.salario = EvaluaSalario(value);
        }

        private string nombre;
        private double salario;
    }
}
