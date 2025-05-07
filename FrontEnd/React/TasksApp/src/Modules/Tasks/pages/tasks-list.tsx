import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTask, getTasks } from "../services/tasksServices";
import "./list.css"// estilo de CSS para el componente

interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    estado: string;
  }

export default function Tasks() {
    // inicializar las variables de estado
    const [tasks, setTasks] = useState<Task[]>([]); // inicializar el estado de las tareas como un array vacío
    const [error, setError] = useState<string>(""); // inicializar el estado de error como una cadena vacía
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const data = await getTasks();
            if (!data) {
              throw new Error("No se encontraron tareas disponibles.");
            }
            setTasks(data); // Asegúrate que tu backend devuelva un array de tareas directamente
          } catch (err) {
            console.error(err);
            setError("No se pudieron cargar las tareas.");
          }
        };
    
        // Llamar a la función para obtener las tareas al cargar el componente
        fetchTasks();
      }, []);

      const handleDeleteUser = async (id: number) => {
            try {
              await deleteTask(id);
              setTasks(tasks.filter((task) => task.id !== id));
            } catch (err) {
              console.error(err);
              setError("No se pudo eliminar el usuario.");
            }
          };

      return (
        <div className="contenedor">
          <button className="btn-success" onClick={() => navigate("/tasks/form")} > Crear nueva Task </button>
          <h2>Lista de Tareas</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.nombre}</td>
                  <td>{task.descripcion}</td>
                  <td>{task.tipo}</td>
                  <td>{task.estado}</td>
                  <td>
                  <button className="btn-primary" onClick={() => navigate(`/tasks/form/${task.id}`)}>Editar</button>
                  <button className="btn-danger" onClick={() => handleDeleteUser(task.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}