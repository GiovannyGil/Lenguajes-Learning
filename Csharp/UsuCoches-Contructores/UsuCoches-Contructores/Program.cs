// See https://aka.ms/new-console-template for more information
// Verifica si tienes este espacio de nombres
using System;

/**
 * CONSTRUCTORES
 * 
 * Sirven para dar un estado inicial a los objetos, se puede modificar despues
 * pero debe tener un estado inicial
 * 
 * Tiene el mismo nombre de la clase
 * no retorna nada
 * no es de tipo void
 * 
 * SOBRECARGA DE CONSTRUCTORES:
 * se puedes crear varios constructes "nombre igual" lo que los diferencia, es los parametros y la cantidad de parametros
 * 
 * estos parametros se le pasan al instanciar el objeto
 * 
 * CONSTRUCTOR POR DEFECTO
 * si no se declara, para C# como el interprete si los esta, sin parametros ni valores -> esta vacio
 * seria así:
 * public Coche() {}
 */


class Program
{
    static void Main(string[] args)
    {
        Coche coche = new Coche(); // Crear una instancia de la clase Coche
        Coche coche1 = new Coche(4500.25, 1200.35); // llarmar al segundo constructor (con parametros)

        Console.WriteLine(coche.getInfoCoche()); // ver el coche con la informacion inicial del constructor

        Console.WriteLine(coche1.getInfoCoche());

        coche1.setExtras(true, "cuero"); // pasar los valores mediante parametros al metodo setter
        Console.WriteLine(coche1.getExtras()); // mostrar la informacion pasada medante un metodo getter
    }
}


/**
 * DIVIDIR LA CLASE COCHE EN DOS CON LA PALABRA RECERVADA "PARTIAL"
 * SU USA PARA SEPARAR CODIGO PARA EVITAR BUSCAR ERRORES EN MUCHAS LINEAS Y SOLO LO BUSCAS EN LA "PARTE"
 */

partial class Coche
{
    // Constructor
    public Coche()
    {
        ruedas = 4;
        largo = 2300.5;
        ancho = 0.800;
        tapiceria = "tela";
    }
    // sobrecarga de constructores
    public Coche(double largoCoche, double anchoCoche)
    {
        ruedas = 4;
        largo = largoCoche;
        ancho = anchoCoche;
        tapiceria = "tela";
    }
}
partial class Coche
{
    // metodo get para acceder a las propiedades
    public String getInfoCoche()
    {
        return "Información del Coche:\n " + "Ruedas: " + ruedas + " Largo: " + largo + " Ancho: " + ancho;
    }

    // metodos setter -> son metodos que permiten pasar información/valor a las propiedades
    public void setExtras(bool climatizador, String tapiceria)
    {
        this.climatizador = climatizador;
        this.tapiceria = tapiceria;
    }
    public String getExtras()
    {
        return "Extras del Coche: \n" + "Climatizador: " + climatizador + " Tapiceria: " + tapiceria;
    }

    // Propiedades
    private int ruedas;
    private double largo;
    private double ancho;
    private bool climatizador;
    private string tapiceria;

    // Métodos y otros miembros de la clase...
}
