// src/components/Layout.tsx
import { Link, Outlet, useNavigate  } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Borra el token
    navigate("/");         // Redirige al login
  };
  return (
    <div>
      <nav style={{ background: "#222", padding: "1rem" }}>
        <Link to="/users" style={{ color: "white", marginRight: "1rem" }}>Usuarios</Link>
        <Link to="/tasks" style={{ color: "white" }}>Tareas</Link>
        <button
          
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid white",
            padding: "0.5rem",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          Cerrar sesión
        </button>
      </nav>
      <Outlet />
    </div>
  );
}