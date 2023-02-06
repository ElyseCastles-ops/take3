import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "./firebaseConfig";


interface AuthCtx {
  currentUser: User | null;
  pending: boolean;
}

export const AuthContext = createContext<AuthCtx>({currentUser: null, pending: false});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(app), user => {
      if (user) {
        setCurrentUser(user)
        setPending(false)
      }
      
    })
    // app.auth().onAuthStateChanged((user) => {
    //   setCurrentUser(user)
    //   setPending(false)
    // });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser ? currentUser : null,
        pending
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
