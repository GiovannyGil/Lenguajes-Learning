using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C_.Models
{
    internal class Cerveza : Bebida 
        // indicar que hereda de bebida, y eso le da por defecto los metodos de las bebidas que sean publicos o protegidos
    {
        public Cerveza(): base("Cerveza", 500) // darle los paramtros que pide le padre "BEBIDA"
        {

        }
    }
}
