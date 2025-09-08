import { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import auth from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useAxiosPublic from "../Hooks/axiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseLoading, setFirebaseLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

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

  // Sign in use with google__
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "success",
        title: "Signed in successfully",
      });

      return result;
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        Swal.fire({
          title: "Google Sign-In Cancelled",
          text: "You closed the sign-in popup. If you don’t want to use Google, try creating an account with email instead.",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Google Sign-In Failed",
          text: "There was an issue signing in. Please try again.",
          icon: "error",
        });
      }
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

      if (currentUser) {
        const userEmail = { email: currentUser.email };

        axiosPublic.post("/jwt", userEmail, {withCredentials: true}).then(() => {
        });
      }

      setUserLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    firebaseLoading,
    userLoading,
    handleCreateUser,
    handleLoginUser,
    handleGoogleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
