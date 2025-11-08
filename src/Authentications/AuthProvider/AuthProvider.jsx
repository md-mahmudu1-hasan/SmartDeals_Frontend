import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { auth } from "../../Utilities/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetch("http://localhost:3000/gettoken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.token);
            localStorage.setItem("token", data.token);
          });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const SignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const val = {
    createUser,
    signIn,
    user,
    SignOut,
    loading,
    googleSignIn,
    setLoading,
  };
  return (
    <div>
      <AuthContext value={val}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
