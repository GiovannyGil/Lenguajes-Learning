import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../services/usersServices";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    nombre_usuario: "",
    email: "",
    clave: "",
    edad: 0,
    celular: "",
    direccion: "",
    fecha_nacimiento: "",
    sexo: "",
    estado: 1,
  });

  useEffect(() => {
    if (isEditMode) {
      getUserById(Number(id)).then(data => {
        setFormData({
          ...data,
          fecha_nacimiento: data.fecha_nacimiento.split("T")[0], // para input date
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
        await updateUser(Number(id), formData);
      } else {
        await createUser(formData);
      }
      navigate("/users"); // volver a la lista
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  return (
    <div className="contenedor">
      <h2>{isEditMode ? "Editar Usuario" : "Crear Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Nombres" />
        <input name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" />
        <input name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} placeholder="Usuario" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="clave" type="password" value={formData.clave} onChange={handleChange} placeholder="Clave" />
        <input name="edad" type="number" value={formData.edad} onChange={handleChange} placeholder="Edad" />
        <input name="celular" value={formData.celular} onChange={handleChange} placeholder="Celular" />
        <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" />
        <input name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} />
        <select name="sexo" value={formData.sexo} onChange={handleChange}>
          <option value="">Seleccione sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
        </select>
        <button type="submit">{isEditMode ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}
