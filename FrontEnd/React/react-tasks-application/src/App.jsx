import TaskList from './Components/TaskList'
import TaskForm from './Components/TaskForm'
import { tasks as data } from "./data/task";
import {useState, useEffect} from 'react'

function App(){

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(data);
  }, []); // Se ejecuta cuando se cargue el arreglo vacio, para cargar los datos

  function CreateTask(task){
    setTasks([...tasks,{
      title:task.title,
      id:tasks.length, // da un numero automatico incrementado
      description: task.description,
    }]) // copia lo elementos del arreglo y añade un elemento nuevo
  }


  return <div>
    <TaskForm CreateTask={CreateTask}/>
    <TaskList tasks={tasks}/>
  </div>
}

export default App

// rfce = crear componentes de forma más rápida
