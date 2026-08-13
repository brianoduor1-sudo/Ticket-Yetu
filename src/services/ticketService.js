import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const TICKETS_COLLECTION =
  "tickets";


const generateTicketCode = () => {
  const randomPart =
    Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

  return `ETY-${Date.now()}-${randomPart}`;
};


export const createTicket =
  async ({
    bookingId,
    userId,
    eventId,
  }) => {
    if (!bookingId) {
      throw new Error(
        "Booking ID is required."
      );
    }

    if (!userId) {
      throw new Error(
        "User ID is required."
      );
    }

    if (!eventId) {
      throw new Error(
        "Event ID is required."
      );
    }

    const ticket = {
      ticketCode:
        generateTicketCode(),

      bookingId,

      userId,

      eventId,

      status: "valid",

      createdAt:
        serverTimestamp(),
    };

    const ticketRef =
      await addDoc(
        collection(
          db,
          TICKETS_COLLECTION
        ),
        ticket
      );

    return {
      id: ticketRef.id,

      ...ticket,
    };
  };


export const getUserTickets =
  async (userId) => {
    if (!userId) {
      throw new Error(
        "User ID is required."
      );
    }

    const ticketsQuery =
      query(
        collection(
          db,
          TICKETS_COLLECTION
        ),
        where(
          "userId",
          "==",
          userId
        )
      );

    const snapshot =
      await getDocs(
        ticketsQuery
      );

    return snapshot.docs.map(
      (document) => ({
        id: document.id,

        ...document.data(),
      })
    );
  };


export const getBookingTickets =
  async (bookingId) => {
    if (!bookingId) {
      throw new Error(
        "Booking ID is required."
      );
    }

    const ticketsQuery =
      query(
        collection(
          db,
          TICKETS_COLLECTION
        ),
        where(
          "bookingId",
          "==",
          bookingId
        )
      );

    const snapshot =
      await getDocs(
        ticketsQuery
      );

    return snapshot.docs.map(
      (document) => ({
        id: document.id,

        ...document.data(),
      })
    );
  };