using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C_.Models
{
    internal class Bebida
    {
        public string Nombre { get; set; } // 

        public int Cantidad { get; set; }


        // metodo contructor -> metodo para saber que existe (vavalores), siempre debe tener el mismo nombre que la clase
        public Bebida(string Nombre, int Cantidad) {
            this.Nombre = Nombre; // indicar que nombre el los mismo que el metodo nombre
            this.Cantidad = Cantidad; // indica que la cantidad es el mismo valor que el metodo cantidad
        }

        public void Beberse(int cuantoBebio)
        {
            this.Cantidad -= cuantoBebio; // para saber la cantidad de lo que bebio se debe comparar y restar de la cantidad total
        }
    }
}
