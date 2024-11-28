import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextProps {
  role: string | null;
  setRole: (role: string | null) => void;
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Aquí podrías agregar la lógica para obtener el rol desde el API al iniciar sesión
  useEffect(() => {
    // Simulación de obtener rol del usuario
    // const role = // fetch from API
    // setRole(role);
    // setAuthenticated(true);
  }, []);

  return (
    <UserContext.Provider value={{ role, setRole, isAuthenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de un UserProvider");
  return context;
};
