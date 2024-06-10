"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext<any>({
  isAuthenticated: false,
  user: null,
  setUser: null,
  firstVisit: true,
  setFirstVisit: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [firstVisit, setFirstVisit] = useState(true);
  useEffect(() => {
    async function loadUserFromCookies() {
      const name = Cookies.get("name");
      if (name) {
        const response = await axios.get("/api/users/user");
        const user = response.data.data;
        if (user) setUser(user);
      }
    }
    loadUserFromCookies();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser, firstVisit, setFirstVisit }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
