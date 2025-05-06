import { useState } from "react";

function TaskForm({ CreateTask }) {
  const [title, setTitle] = useState(""); //inicia el titulo con un string vacio
  const [description, setDescription] = useState(""); //inicia la descripcion con un string vacio

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateTask({ 
      title, 
      description,
    });

    // limpiar los campos luego de guardar
    setTitle('')
    setDescription('')
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe tu tarea"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        autoFocus
      />{" "}
      {/*guardar en estado "useState" lo ingresado*/}
      {/* obtener el alor ingresado en e input, por la funcion y el evento change */}
      <textarea
        placeholder="descripcion de la tarea"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>
      <button>Guardar</button>
    </form>
  );
}

export default TaskForm;
