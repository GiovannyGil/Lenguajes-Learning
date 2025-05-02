import { useEffect, useState } from "react";
import { getAllTasks } from "../api/task.api"; // taer la lista de las tareas / importar la ruta
import { TaskCard } from "./TaskCard";

export function TaskList() {

    const [tasks, setTasks]=useState([]); // usar los datos que vienen del backend

  useEffect(() => { // funion para traer los datos mediante la ruta api del backend -> django
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);

  return <div className="grid grid-cols-3 gap-3">
    {tasks.map(task => (
        <TaskCard key={task.id} task={task}/> // ver la información, trayendola desde el componente
    ))}
  </div>;
}
