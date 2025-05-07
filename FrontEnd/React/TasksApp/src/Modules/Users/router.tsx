import UserForm from "./pages/users-form";
import Users from "./pages/users-list";
import type { RouteObject } from "react-router-dom";

export const usersRoutes: RouteObject[] = [
  { path: "/users", element: <Users /> },
  { path: "/users/form", element: <UserForm /> },
  { path: "/users/form/:id", element: <UserForm /> }
  
];