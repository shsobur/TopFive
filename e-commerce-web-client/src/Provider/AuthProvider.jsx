import { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import auth from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseLoading, setFirebaseLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  // Creates a new user with email and password__
  const handleCreateUser = async (email, password) => {
    setFirebaseLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Invalid email address",
          text: "Email already in exist. Use another email to sign up!",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Sign Up Failed",
          text: "There might be some issue, Please try again!",
          icon: "error",
        });
      }

      throw error;
    } finally {
      setFirebaseLoading(false);
    }
  };

  // Login user with email and password__
  const handleLoginUser = async (email, password) => {
    setFirebaseLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        Swal.fire({
          title: "Invalid Credential!",
          text: "Invalid email or password. Try again with valid email and password",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Sign In Failed",
          text: "There might be some issue, Please try again!",
          icon: "error",
        });
      }

      throw error;
    } finally {
      setFirebaseLoading(false);
    }
  };

  // log out user__
  const logOut = () => {
    return signOut(auth);
  };

  // Monitor the current authenticated user__
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    firebaseLoading,
    userLoading,
    handleCreateUser,
    handleLoginUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;