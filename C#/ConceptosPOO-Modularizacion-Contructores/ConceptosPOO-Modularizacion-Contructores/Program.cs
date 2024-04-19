namespace ConceptosPOO_Modularizacion_Contructores
{
    internal class Program
    {
        static void Main(string[] args)
        {
            RealizarTarea(); // llamar el metodo para ejecutarlo
        }


        static void RealizarTarea()
        {
            // TODO: usar este comentario para navegar a el mediante la lista de tareas "ver->lista de tareas->doble click en el comentario

            // llamar al contructor / instanciar la clase Punto,
            Punto origen = new Punto(); // sin parametros
            Punto destino = new Punto(150, 90); // con parametros


            // llamar el metodo para calcular la distancia

            double distancia = origen.DistanciaHasta(destino);
            // imprimir
            Console.WriteLine($"La distancia entre los puntos es de: {distancia}");
            Console.WriteLine($"Numero de objetos creados: {Punto.ContadorDeObjetos()}");
        }
    }
}