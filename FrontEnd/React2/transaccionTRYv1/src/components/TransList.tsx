import { useEffect, useState } from "react"
import { getTrans } from "../api/api-trans"
import { Transaccion } from "../models/transaccion.model"

function TransList() {

    const [trans, setTrasns] = useState<Transaccion[]>([])
    useEffect(() => {
        getTrans().then((res) => res.json()).then((data) => setTrasns(data))
    }, [])
  return (
    <div>
        {
            trans.map(t => (
                <div key={t.TransaccionID} className="bg-gray-200">
                    <h2>::{t.ClienteID}</h2>
                    <h2>::{t.VehiculoID}</h2>
                    <h2>::{t.ConcecionarioID}</h2>
                    <h2>::{t.FechaVenta}</h2>
                    <h2>::{t.PrecioVenta}</h2>
                </div>
            
            ))
        }
    </div>
  )
}

export default TransList