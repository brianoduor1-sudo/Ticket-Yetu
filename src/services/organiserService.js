import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const USERS_COLLECTION = "users";

export const getOrganiserStatus =
  async (uid) => {
    if (!uid) {
      throw new Error(
        "User ID is required."
      );
    }

    const userRef = doc(
      db,
      USERS_COLLECTION,
      uid
    );

    const snapshot =
      await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error(
        "User profile not found."
      );
    }

    return (
      snapshot.data()
        .organiserStatus || "none"
    );
  };

export const requestOrganiser =
  async (uid) => {
    if (!uid) {
      throw new Error(
        "User ID is required."
      );
    }

    const userRef = doc(
      db,
      USERS_COLLECTION,
      uid
    );

    const snapshot =
      await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error(
        "User profile not found."
      );
    }

    const userData =
      snapshot.data();

    if (
      userData.organiserStatus ===
      "approved"
    ) {
      throw new Error(
        "User is already an approved organiser."
      );
    }

    if (
      userData.organiserStatus ===
      "pending"
    ) {
      throw new Error(
        "Organiser request is already pending."
      );
    }

    await updateDoc(
      userRef,
      {
        organiserStatus:
          "pending",
      }
    );
  };
  