using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConceptosPOO_Modularizacion_Contructores
{
    internal class Punto
    {
        // constructor para calcular las coordenadas, con parametros
        public Punto(int x, int y)
        {
            this.x = x; // el campo de la clase x, va a ser igual al valor que se le pase a x por parametro
            this.y = y;
            contadorDeObjetos++;
        }

        // constructor por defecto sin parametros
        public Punto()
        {
            // dar valores iniciarles
            this.x = 0;
            this.y = 0;
            contadorDeObjetos++;

        }

        public double DistanciaHasta(Punto otroPunto)
        {
            int xDif = this.x - otroPunto.x;
            int yDif = this.y - otroPunto.y;

            double distanciaPuntos = Math.Sqrt(Math.Pow(xDif, 2) + Math.Pow(yDif, 2));

            return distanciaPuntos;
        }

        private int x, y;

        private static int contadorDeObjetos = 0;

        // metodo de acceso para ver la informaion del contador de objeots
        public static int ContadorDeObjetos()
        {
            return contadorDeObjetos;
        }
    }
}
