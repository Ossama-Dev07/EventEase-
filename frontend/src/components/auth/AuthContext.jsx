// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    axios.defaults.withCredentials = true;
  useEffect(() => {
    // Check if user is already logged in when the app loads
    axios
      .get("http://localhost:30084/user")
      .then((res) => {
        setUser(res.data); // Save user data when login succeeds
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
