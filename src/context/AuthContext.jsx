import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  subscribeToAuthChanges,
} from "../services/authService";

import {
  createUserProfile,
  subscribeToUserProfile,
} from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile = null;

    const unsubscribeAuth =
      subscribeToAuthChanges(
        async (firebaseUser) => {
          try {
            setLoading(true);

            // User logged out
            if (!firebaseUser) {
              setUser(null);
              setProfile(null);

              if (unsubscribeProfile) {
                unsubscribeProfile();
                unsubscribeProfile = null;
              }

              setLoading(false);
              return;
            }

            // User logged in
            setUser(firebaseUser);

            /*
              Make sure a Firestore profile exists.
            */
            const createdProfile =
              await createUserProfile(
                firebaseUser
              );

            setProfile(createdProfile);

            /*
              Listen to the Firestore user document
              in real time.
            */
            if (unsubscribeProfile) {
              unsubscribeProfile();
            }

            unsubscribeProfile =
              subscribeToUserProfile(
                firebaseUser.uid,
                (updatedProfile) => {
                  setProfile(
                    updatedProfile
                  );
                  setLoading(false);
                },
                () => {
                  setLoading(false);
                }
              );
          } catch (error) {
            console.error(
              "Authentication error:",
              error
            );

            setProfile(null);
            setLoading(false);
          }
        }
      );

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const value = {
    user,

    profile,

    loading,

    isAuthenticated: Boolean(user),

    isAttendee:
      profile?.role === "attendee",

    isOrganiser:
      profile?.role === "organiser" &&
      profile?.organiserStatus ===
        "approved",

    organiserPending:
      profile?.organiserStatus ===
      "pending",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(
    AuthContext
  );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}
