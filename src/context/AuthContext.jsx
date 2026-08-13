import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase";

import {
  createUserProfile,
  getUserProfile,
} from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async (userId) => {
    try {
      const updatedProfile =
        await getUserProfile(userId);

      setProfile(updatedProfile);

      return updatedProfile;
    } catch (error) {
      console.error(
        "Failed to refresh profile:",
        error
      );

      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (!firebaseUser) {
            setUser(null);
            setProfile(null);
            setLoading(false);
            return;
          }

          setUser(firebaseUser);

          let userProfile =
            await getUserProfile(firebaseUser.uid);

          if (!userProfile) {
            userProfile =
              await createUserProfile(firebaseUser);
          }

          setProfile(userProfile);
        } catch (error) {
          console.error(
            "Authentication error:",
            error
          );

          setUser(null);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
