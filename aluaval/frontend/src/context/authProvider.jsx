import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginAPI } from "../services/dataFetch.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("Token in localStorage:", token); // Debug log
    console.log("User in localStorage:", userData); // Debug log

    if (token && userData) {
      setUser(JSON.parse(userData));

      console.log("User restored:", JSON.parse(userData)); // Debug log
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginAPI(credentials);
      localStorage.setItem("token", response.token); // Ensure token is stored
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      console.log("Login successful, user set:", response.user); // Debug log
    } catch (err) {
      console.error("Login error: ", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
