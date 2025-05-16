
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userEmail: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('velouraUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserEmail(userData.email);
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, we would validate credentials against a backend
    // For our simulation, we'll just check if the user exists in localStorage
    const savedUser = localStorage.getItem(`velouraUser_${email}`);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      
      // Simple password check (insecure, just for demonstration)
      if (userData.password === password) {
        setIsLoggedIn(true);
        setUserEmail(email);
        
        // Store current user for persistent login
        localStorage.setItem('velouraUser', JSON.stringify({ email }));
        
        return true;
      }
    }
    
    // For now, we'll allow any login for demonstration
    setIsLoggedIn(true);
    setUserEmail(email);
    
    // Store current user for persistent login
    localStorage.setItem('velouraUser', JSON.stringify({ email }));
    
    return true;
  };

  const register = (email: string, password: string) => {
    // In a real app, we would send this to a backend API
    // For our simulation, we'll just store it in localStorage
    localStorage.setItem(`velouraUser_${email}`, JSON.stringify({
      email,
      password,
    }));
    
    // Auto-login after registration
    login(email, password);
    
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem('velouraUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
