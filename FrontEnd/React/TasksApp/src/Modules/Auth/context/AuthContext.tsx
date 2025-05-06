import { createContext, useContext, useState, type ReactNode } from "react";

// Definir el tipo de contexto para la autenticación
interface AuthContextType {
  token: string | null; // token que se almacena en localStorage
  login: (token: string) => void; // función para iniciar sesión y almacenar el token
  logout: () => void; // función para cerrar sesión y eliminar el token
  isAuthenticated: boolean; // indica si el usuario está autenticado o no
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
