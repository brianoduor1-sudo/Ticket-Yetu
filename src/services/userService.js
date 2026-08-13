import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const createUserProfile = async (user, name = "") => {
  const userRef = doc(db, "users", user.uid);

  const existingProfile = await getDoc(userRef);

  if (existingProfile.exists()) {
    return {
      id: existingProfile.id,
      ...existingProfile.data(),
    };
  }

  const profile = {
    name: name || user.displayName || "",
    email: user.email || "",
    role: "attendee",
    organiserStatus: "none",
    photoURL: user.photoURL || "",
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);

  return profile;
};

export const getUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const updateUserProfile = async (
  userId,
  updates
) => {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, updates);
};

export const requestOrganiserAccess = async (user) => {
  if (!user || !user.uid) {
    throw new Error("No authenticated user found.");
  }

  // Update the user's Firestore profile
  const userRef = doc(db, "users", user.uid);

  await updateDoc(userRef, {
    organiserStatus: "pending",
  });

  // Create organiser request
  const requestRef = await addDoc(
    collection(db, "organiserRequests"),
    {
      userId: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      status: "pending",
      createdAt: serverTimestamp(),
      reviewedAt: null,
      reviewedBy: null,
    }
  );

  return requestRef.id;
};
