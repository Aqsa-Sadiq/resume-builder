import React, { useState, useEffect, createContext, useContext } from "react";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile 
} from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase.config";

//***************** Firebase Initialization ************************
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authValue = useProvideAuth();
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

//***************** Private Route Component ************************
export const PrivateRoute = ({ redirectPath = "/login" }) => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={redirectPath} />;
};

//***************** Auth Logic ************************
const getUserData = (user) => {
  if (!user) return null;
  const { email, displayName, photoURL } = user;
  return { email, name: displayName, photo: photoURL };
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(getUserData(firebaseUser));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const signedInUser = getUserData(result.user);
      setUser(signedInUser);
      window.history.back();
      return result.user;
    } catch (error) {
      setUser(null);
      return error.message;
    }
  };

  // Email/Password Sign In
  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(getUserData(result.user));
      window.history.back();
      return result.user;
    } catch (error) {
      setUser(null);
      return error.message;
    }
  };

  // Email/Password Sign Up
  const signUp = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      setUser(getUserData(result.user));
      window.history.back();
      return result.user;
    } catch (error) {
      setUser(null);
      return error.message;
    }
  };

  // Sign Out
  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return true;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  return {
    user,
    signIn,
    signUp,
    signOut: signOutUser,
    signInWithGoogle,
  };
};
