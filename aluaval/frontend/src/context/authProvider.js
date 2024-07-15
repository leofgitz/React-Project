import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginAPI } from "../services/dataFetch.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data) {
        setUser(data);
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginAPI(credentials);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    } catch (err) {
      console.error("Login error: ", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
