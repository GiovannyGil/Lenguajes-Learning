import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // estilo de CSS para el componente

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simula la llamada al backend (reemplaza esto luego por axios)
    const fakeToken = "jwt.fake.token";
    login(fakeToken);
    navigate("/dashboard");
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input "
            />
        <button type="submit" className="btn">Entrar</button>
        </form>
    </div>
  );
}
