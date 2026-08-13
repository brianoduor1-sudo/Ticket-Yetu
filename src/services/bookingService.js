import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const createBooking = async ({
  userId,
  eventId,
  quantity,
  unitPrice,
}) => {
  const totalPrice = quantity * unitPrice;

  const bookingRef = await addDoc(
    collection(db, "bookings"),
    {
      userId,
      eventId,

      quantity,
      unitPrice,
      totalPrice,

      status: "confirmed",
      paymentStatus: "pending",

      bookingDate: serverTimestamp(),
    }
  );

  return bookingRef.id;
};

export const getUserBookings = async (userId) => {
  const q = query(
    collection(db, "bookings"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
