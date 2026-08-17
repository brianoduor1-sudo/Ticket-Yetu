import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const googleProvider =
  new GoogleAuthProvider();

export const registerUser = async (
  email,
  password
) => {
  const result =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  return result.user;
};

export const loginUser = async (
  email,
  password
) => {
  const result =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return result.user;
};

export const loginWithGoogle = async () => {
  const result =
    await signInWithPopup(
      auth,
      googleProvider
    );

  return result.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const subscribeToAuthChanges = (
  callback
) => {
  return onAuthStateChanged(
    auth,
    callback
  );
};
