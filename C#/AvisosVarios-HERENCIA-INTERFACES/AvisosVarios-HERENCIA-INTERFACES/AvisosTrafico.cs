using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AvisosVarios_HERENCIA_INTERFACES
{
    internal class AvisosTrafico: IAvisos
    {

        public AvisosTrafico() 
        {
            Remitente = "CENTRAL DE AVISOS";
            Mensaje = "RECUERDE PAGAR SUS SANCIONES/IMPUESTOS ANTES DE UNA SEMANA PARA TENER UN DESCUENTO";
            Fecha =  "PRESENTE DIA";
        }

        public AvisosTrafico(string ELRemitente, string ELMensaje, string LAFecha)
        {
            Remitente = ELRemitente; // el remitente es igual al remitente que venga por el parametro
            Mensaje = ELMensaje; // el mensaje es igual a el mensaje que venga por parametro
            Fecha = LAFecha; // la fecha es igual a la fecha que venga por parametro
        }


        /// METODOS DE LA INTERFACE
        public void MostrarAviso()
        {
            Console.WriteLine($"Mensaje enviado por {Remitente} , Contenido del mensaje: {Mensaje} , en la Fecha {Fecha}");
        }
        public string getFecha()
        {
            return Fecha;
        }

        // CAMPOS DE CLASE
        private string Remitente;
        private string Mensaje;
        private string Fecha;
    }
}
