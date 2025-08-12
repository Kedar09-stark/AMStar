import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { adminEmails } from "../constants/adminEmails";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // extended user object with `pro`
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load pro status from localStorage
  const getProStatus = () => localStorage.getItem("isProUser") === "true";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const extendedUser = {
          ...firebaseUser,
          pro: getProStatus(),
        };
        setUser(extendedUser);
        setIsAdmin(adminEmails.includes(firebaseUser.email));
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Update pro status in user state and localStorage
  const setUserProStatus = (isPro) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, pro: isPro };
      localStorage.setItem("isProUser", isPro ? "true" : "false");
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, setUserProStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
