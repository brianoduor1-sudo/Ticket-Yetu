import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const generateTicketNumber = () => {
  return `EVT-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
};

export const createTicket = async ({
  bookingId,
  eventId,
  userId,
  eventTitle,
}) => {
  const ticketRef = await addDoc(
    collection(db, "tickets"),
    {
      bookingId,
      eventId,
      userId,

      eventTitle,

      ticketNumber: generateTicketNumber(),

      status: "valid",
      checkedIn: false,

      createdAt: serverTimestamp(),
    }
  );

  return ticketRef.id;
};

export const getUserTickets = async (userId) => {
  const q = query(
    collection(db, "tickets"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
