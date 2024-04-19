// See https://aka.ms/new-console-template for more information

// Definir el objeto de la clase Circulo
Circulo circulo; // varible/objeto de tipo Circulo

// instanciar una clase
circulo = new Circulo(); // iniciacion de variable/objeto de tipo Circulo

// declarar e iniciar en la misma linea
Circulo circulo2 = new Circulo();

ConversorEuroDollar obj = new ConversorEuroDollar();

//Console.WriteLine(circulo.CalculoArea(5)); // usar o llamar el metodo de la clase Circulo, que es publico

//// usar la segunda instancia
//Console.WriteLine(circulo2.CalculoArea(9));

obj.CambiarValorEuro(1.05);
Console.WriteLine(obj.Convierte(50));


// clase para construir metodos
class Circulo
{
    // constante perteneciente a este ambito (clase/metodo/bloque) = private
    private const double pi = 3.1416; // propiedad de clase circulo --> Campos de clase

    // metodo para especificar que hace un circulo (metodo de clase)
    public double CalculoArea(int radio)
    {
        // calcular el area de un radio con la formula = PI*r^2
        return pi * radio * radio;
    }

}

class ConversorEuroDollar
{
    // se le pasa un valor en euro, y lo pasará a dollar

    private double Euro = 1.253; // el valor puede cambiar, debe ser encapsulado y cambiar su valor mediante un metodo de acceso
    public double Convierte(double Cantidad)
    {
        return Cantidad * Euro;
    }

    // metodo de acceso para cambiar el valor de Euro

    public void CambiarValorEuro(double nuevoValor)
    {
        if (nuevoValor < 0)
        {
            Euro = 1.253;
        } else
        {
            Euro = nuevoValor;
        }
    }
}

