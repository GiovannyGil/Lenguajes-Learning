import TaskForm from "./pages/tasks-form";
import Tasks from "./pages/tasks-list";
import type { RouteObject } from "react-router-dom";

export const tasksRoutes: RouteObject[] = [
  { path: "/tasks", element: <Tasks /> },
   { path: "/tasks/form", element: <TaskForm /> },
    { path: "/tasks/form/:id", element: <TaskForm /> }
];
