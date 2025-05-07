import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/usersServices";
import "./list.css"// estilo de CSS para el componente

interface User {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_usuario: string;
    email: string;
    clave: string;
    edad: number;
    celular: string;
    direccion: string;
    fecha_nacimiento: Date;
    sexo: string;
    estado: number;
}

export default function Users() {
    // inicializar las variables de estado
    const [users, setUsers] = useState<User[]>([]); // inicializar el estado de los usuarios como un array vacío
    const [error, setError] = useState<string>(""); // inicializar el estado de error como una cadena vacía
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const data = await getUsers();
          if (!data) {
            throw new Error("No se encontraron usuarios disponibles.");
          }
          setUsers(data);
        } catch (err) {
          console.error(err);
          setError("No se pudieron cargar los usuarios.");
        }
      };
  
      fetchUsers();
    }, []);

    const handleDeleteUser = async (id: number) => {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        console.error(err);
        setError("No se pudo eliminar el usuario.");
      }
    };
  
      return (
        
        <div className="contenedor">
          <button className="btn-success" onClick={() => navigate("/users/form")} > Crear nuevo usuario </button>
          <h2>Lista de Usuarios</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Nombre Usuario</th>
                <th>Email</th>
                {/* <th>Clave</th> */}
                <th>Edad</th>
                <th>Celular</th>
                <th>Dirección</th>
                <th>Fecha Nacimiento</th>
                <th>Sexo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombres}</td>
                  <td>{user.apellidos}</td>
                  <td>{user.nombre_usuario}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.clave}</td> */}
                  <td>{user.edad}</td>
                  <td>{user.celular}</td>
                  <td>{user.direccion}</td>
                  <td>{user.fecha_nacimiento.toString()}</td>
                  <td>{user.sexo}</td>
                  <td>{user.estado}</td>
                  <td>
                    <button className="btn-primary" onClick={() => navigate(`/users/form/${user.id}`)}>Editar</button>
                    <button className="btn-danger" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
        );
    }
