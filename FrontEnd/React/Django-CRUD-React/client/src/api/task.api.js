// Enviar peticion al Backend "Django" para pedir o llamar datos
import axios from 'axios'

// instancia la ruta 
const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/task/' // ruta de la api ==> ruta en la app django tasks
})


// export const getAllTasks = () => taskApi.get('/');
export const getAllTasks = () => { // leer - ver -> obtener todas las tareas
    return taskApi.get('/') 
}

export const getTask = (id) => taskApi.get(`${id}/`) // -> obtener una sola tarea, obtenida por el ID


// export const getAllTaasks = (task) => taskApi.post('/', task);
export const createTaks = (task) => { // crear
    return taskApi.post('/', task)
}

export const deleteTask = (id) => taskApi.delete(`${id}`); // eliminar

export const updateTask = (id, task) => taskApi.put(`/${id}/`, task) // actualizar