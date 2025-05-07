import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTaskById, updateTask } from "../services/tasksServices";

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    estado: 1,
  });

  useEffect(() => {
    if (isEditMode) {
        getTaskById(Number(id)).then(data => {
        setFormData({
          ...data,
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateTask(Number(id), formData);
      } else {
        await createTask(formData);
      }
      navigate("/tasks"); // volver a la lista
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  return (
    <div className="contenedor">
      <h2>{isEditMode ? "Editar Task" : "Crear Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripcion" />
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="">Seleccione el tipo</option>
          <option value="1">Complejo</option>
          <option value="2">Básico</option>
        </select>
        <input name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado" />
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
        </select>
        <button type="submit">{isEditMode ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}
