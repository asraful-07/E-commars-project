import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile
  const manageProfile = async (name, image) => {
    setLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        });

        setUser((prevUser) => ({
          ...prevUser,
          displayName: name,
          photoURL: image,
        }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // forgot password
  const forgotPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const handleLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });

  //   return () => {
  //     return unSubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setUser(currentUser);

  //     if (currentUser?.email) {
  //       const user = { email: currentUser.email };

  //       try {
  //         const response = await axios.post(
  //           "https://marathon-server-ashen.vercel.app/jwt",
  //           user,
  //           {
  //             withCredentials: true,
  //           }
  //         );
  //       } catch (error) {
  //         console.error("Error fetching login token:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       try {
  //         const response = await axios.post(
  //           "https://marathon-server-ashen.vercel.app/logout",
  //           {},
  //           { withCredentials: true }
  //         );
  //       } catch (error) {
  //         console.error("Error during logout:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser-->", currentUser?.email);
      if (currentUser?.email) {
        setUser(currentUser);
        // save user info in db
        await axiosSecure.post(`/users/${currentUser?.email}`, {
          name: currentUser?.displayName,
          image: currentUser?.photoURL,
          email: currentUser?.email,
        });
        // Get JWT token
        await axiosSecure.post(
          `/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        );
      } else {
        setUser(currentUser);
        await axiosSecure.get(`/logout`, {
          withCredentials: true,
        });
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const info = {
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    manageProfile,
    handleLogout,
    user,
    loading,
    setUser,
    forgotPassword,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
