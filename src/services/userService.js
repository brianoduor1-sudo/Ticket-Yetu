import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const USERS_COLLECTION = "users";

export const createUserProfile = async (
  user,
  name = ""
) => {
  if (!user) {
    throw new Error("Firebase user is required.");
  }

  const userRef = doc(
    db,
    USERS_COLLECTION,
    user.uid
  );

  const existingUser = await getDoc(userRef);

  if (existingUser.exists()) {
    return existingUser.data();
  }

  const profile = {
    uid: user.uid,
    name: name || user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    role: "attendee",
    organiserStatus: "none",
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);

  return profile;
};

export const getUserProfile = async (uid) => {
  if (!uid) {
    return null;
  }

  const userRef = doc(
    db,
    USERS_COLLECTION,
    uid
  );

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
};

export const updateUserProfile = async (
  uid,
  updates
) => {
  if (!uid) {
    throw new Error("User ID is required.");
  }

  const userRef = doc(
    db,
    USERS_COLLECTION,
    uid
  );

  await updateDoc(userRef, updates);
};

export const requestOrganiserRole = async (
  uid
) => {
  if (!uid) {
    throw new Error("User ID is required.");
  }

  const userRef = doc(
    db,
    USERS_COLLECTION,
    uid
  );

  await updateDoc(userRef, {
    organiserStatus: "pending",
  });
};

/*
  Listen for changes to the user's Firestore
  profile in real time.
*/
export const subscribeToUserProfile = (
  uid,
  callback,
  onError
) => {
  if (!uid) {
    return () => {};
  }

  const userRef = doc(
    db,
    USERS_COLLECTION,
    uid
  );

  return onSnapshot(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error(
        "User profile listener error:",
        error
      );

      if (onError) {
        onError(error);
      }
    }
  );
};
