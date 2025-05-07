import API from "../../../api/axios";

interface LoginResponse {
  token: string;
  user: {
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
  };
}

export async function loginUser(email: string, clave: string): Promise<LoginResponse> {
    const response = await API.post<LoginResponse>("/auth/login", {
        email,
        clave,
    });
  return response.data;
}
