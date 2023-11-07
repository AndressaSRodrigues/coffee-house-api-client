import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AuthProviderProps {
    children: ReactNode;
  }

  const AuthContext = createContext<{ token: string; setToken: Dispatch<SetStateAction<string>> }>({
    token: '',
    setToken: () => {},
  });

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
};
