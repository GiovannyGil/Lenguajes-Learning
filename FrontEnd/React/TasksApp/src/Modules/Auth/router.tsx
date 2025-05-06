import Login from "./pages/Login";
import type { RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  { path: "/login", element: <Login /> },
];
