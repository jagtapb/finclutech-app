import React, { createContext, useEffect, useState } from "react";
import { onUserAuthStateChanged, createUserProfileDocument } from "./config";
import { getDoc } from "firebase/firestore";


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onUserAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const snapShot = await getDoc(userRef);
        setUser(snapShot.data());
      }});
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};