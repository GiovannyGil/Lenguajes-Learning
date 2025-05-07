import axios from "axios";

// Se crea una instancia de axios para hacer peticiones al backend
// Se puede configurar la URL base y los headers que se van a usar en todas las peticiones
const API = axios.create({
  baseURL: "http://localhost:8000/api", // URL del backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Si jay un token JWT guardado, se agrega automáticamente -> esto es útil para las peticiones que requieren autenticación
// es decir, para las rutas protegidas -> pasa el token automaticamente en el header de la petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;