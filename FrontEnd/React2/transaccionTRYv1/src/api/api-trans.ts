import { createTrans, Transaccion } from '../models/transaccion.model';

const API_URL = 'https://localhost:7236/api/Transaccions';


// metodo para crear una nueva transaccion, convirtiendo los datos a un objeto JSON -> POST
export const createTask = (trans: createTrans) => {
    fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trans)
    })

}
// metodo para obtener todas las transacciones -> GET

export const getTrans = () => fetch(`${API_URL}`)

// metodo para obtener una transaccion por su ID -> GET
export const getTransById = (id: number) => fetch(`${API_URL}/${id}`)

// metodo para actualizar una transaccion por su ID -> PUT

// metodo para eliminar una transaccion por su ID -> DELETE
