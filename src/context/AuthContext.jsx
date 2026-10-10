import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const role = localStorage.getItem('userRole');
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if (token && role) {
        setUser({ role, username });
      }
    } catch (e) {
      console.error('Storage access error:', e);
    }
  }, []);

  const login = (role, username) => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    localStorage.setItem('token', 'sample-jwt-token-xyz');
    setUser({ role, username });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      login: () => {},
      logout: () => {},
    };
  }
  return context;
};