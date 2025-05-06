import { ChangeEvent, FormEvent, useState } from "react"
import { createTran } from "../api/api-trans"

function TransaForm() {


    // crear estado para guardar los datos del formulario
    const [trans, setTrans] = useState({
        // estado inicial del formulario
        // TransaccionID: "",
        ClienteID: 0,
        VehiculoID: 0,
        ConcecionarioID: 0,
        FechaVenta: "",
        PrecioVenta: 0
    
    })
    // funcion para manejar los cambios en el formulario, recibe un evento que es el cambio en el input o formulario
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
        setTrans({...trans,[e.target.name]: e.target.value}) // actualizar el estado con los datos del formulario
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault() // prevenir el comportamiento por defecto del formulario
        console.log(trans) // imprimir los datos del formulario
        const res = await createTran(trans) 
        const data = await res.json()
        console.log(data)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 w-full my-2"
             type="number" name="ClienteID" id="ClienteID" placeholder="ClienteID" 
             onChange={handleChange}
             />
            
            <input 
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 w-full my-2"
             type="number" name="VehiculoID" id="VehiculoID" placeholder="VehiculoID" 
             onChange={handleChange}
             />
            
            <input 
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 w-full my-2"
             type="number" name="ConcecionarioID" id="ConcecionarioID" placeholder="ConcecionarioID" 
             onChange={handleChange}
             />
            
            <input 
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 w-full my-2"
             type="date" name="FechaVenta" id="FechaVenta" 
             onChange={handleChange}
             />
            
            <input 
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 w-full my-2"
             type="number" name="PrecioVenta" id="PrecioVenta" placeholder="PrecioVenta" 
             onChange={handleChange}
             />

            <button className="bg-indigo-500 px-3 block py-2 w-full">
                Guardar
            </button>
        </form>
    </div>
  )
}

export default TransaForm