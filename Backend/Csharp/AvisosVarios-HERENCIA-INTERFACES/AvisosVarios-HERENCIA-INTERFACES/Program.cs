namespace AvisosVarios_HERENCIA_INTERFACES
{
    internal class Program
    {
        static void Main(string[] args)
        {
            AvisosTrafico avisoV1 = new AvisosTrafico();

            avisoV1.MostrarAviso();

            AvisosTrafico avisoV2 = new AvisosTrafico("GIO", "PAGUE", "10 DE ENERO");
            Console.WriteLine(avisoV2.getFecha());

            avisoV2.MostrarAviso();
        }
    }
}
