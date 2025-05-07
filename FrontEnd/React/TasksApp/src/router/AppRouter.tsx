import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authRoutes } from "../Modules/Auth/router";
import { tasksRoutes } from "../Modules/Tasks/router";
import { usersRoutes } from "../Modules/Users/router";
import Layout from "../components/navbar/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas sin layout (login, registro, etc.) */}
        {authRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}

        {/* Agrupar todas las rutas protegidas dentro del layout */}
        <Route element={<Layout />}>1
          {/* Rutas del módulo de tareas */}
          {tasksRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}

          {/* Rutas del módulo de usuarios */}
          {usersRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Redirección base */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
