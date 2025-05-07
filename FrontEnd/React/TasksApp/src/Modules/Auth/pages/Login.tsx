import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css"; // estilo de CSS para el componente

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, clave);
      login(data.token);
      console.log("token", data.token);
      // Almacenar el token en localStorage
      localStorage.setItem("token", data.token);
      navigate("/tasks"); // O donde quieras
    } catch (err: any) {
      console.error(err);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="contenedor">
        <form onSubmit={handleSubmit} className="formulario">
        <h2 className="titulo">Iniciar Sesión</h2>
        <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input "
            />
        <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
            className="input "
            />
        <button type="submit" className="btn">Entrar</button>
        </form>
    </div>
  );
}
