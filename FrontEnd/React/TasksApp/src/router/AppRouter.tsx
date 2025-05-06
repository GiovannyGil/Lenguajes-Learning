import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authRoutes } from "../Modules/Auth/router";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección automática de "/" a "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />


        {/* Rutas del módulo de autenticación */}   
        {authRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
        {/* agregar más rutas protegidas aquí */}
      </Routes>
    </BrowserRouter>
  );
}
