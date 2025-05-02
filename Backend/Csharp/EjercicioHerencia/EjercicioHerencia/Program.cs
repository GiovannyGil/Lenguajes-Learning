namespace EjercicioHerencia
{
    internal class Program
    {
        static void Main(string[] args)
        {

            Avion avion = new Avion();
            Coche coche = new Coche();

            Vehiculo[] ColeccionVehiculo = new Vehiculo[2];

            ColeccionVehiculo[0] = coche;
            ColeccionVehiculo[1] = avion;

            for (int i = 0; i < ColeccionVehiculo.Length; i++)
            {
                ColeccionVehiculo[i].Conducir();
            }

        }

        class Vehiculo
        {
            public void ArrancarMotor()
            {
                Console.WriteLine("Arrancar Motor");
            }

            public void PararMotor()
            {
                Console.WriteLine("Parar Motor");
            }

            public virtual void Conducir()
            {
                Console.WriteLine("Puedo Conducir");
            }
        }

        class Avion : Vehiculo
        {
            public void Volar()
            {
                Console.WriteLine("Puedo Volar");
            }

            public void Aterrizar()
            {
                Console.WriteLine("Puedo Aterrizar");
            }

            public override void Conducir()
            {
                Console.WriteLine("Conduce el Piloto");
            }

        }

        class Coche : Vehiculo
        {

        }
    }
}
