import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const submitOrganiserRequest = async (
  user,
  organisationName,
  reason
) => {
  const requestRef = await addDoc(
    collection(db, "organiserRequests"),
    {
      userId: user.uid,
      name: user.displayName || "",
      email: user.email,
      organisationName,
      reason,
      status: "pending",
      createdAt: serverTimestamp(),
    }
  );

  return requestRef.id;
};
