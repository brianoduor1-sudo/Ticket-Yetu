import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
  reserveTickets,
} from "./ticketInventoryService";

const BOOKINGS_COLLECTION =
  "bookings";


export const createBooking =
  async ({
    userId,
    eventId,
    quantity,
    ticketPrice,
  }) => {
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

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      throw new Error(
        "Ticket quantity must be a positive whole number."
      );
    }

    if (
      typeof ticketPrice !==
        "number" ||
      ticketPrice < 0
    ) {
      throw new Error(
        "Invalid ticket price."
      );
    }

    /*
      Reserve the tickets first.

      This prevents overselling.
    */
    await reserveTickets(
      eventId,
      quantity
    );

    const totalAmount =
      quantity * ticketPrice;

    const booking = {
      userId,

      eventId,

      quantity,

      ticketPrice,

      totalAmount,

      status: "confirmed",

      createdAt:
        serverTimestamp(),
    };

    const bookingRef =
      await addDoc(
        collection(
          db,
          BOOKINGS_COLLECTION
        ),
        booking
      );

    return {
      id: bookingRef.id,

      ...booking,
    };
  };


export const getUserBookings =
  async (userId) => {
    if (!userId) {
      throw new Error(
        "User ID is required."
      );
    }

    const bookingsQuery =
      query(
        collection(
          db,
          BOOKINGS_COLLECTION
        ),
        where(
          "userId",
          "==",
          userId
        )
      );

    const snapshot =
      await getDocs(
        bookingsQuery
      );

    return snapshot.docs.map(
      (document) => ({
        id: document.id,

        ...document.data(),
      })
    );
  };


export const getEventBookings =
  async (eventId) => {
    if (!eventId) {
      throw new Error(
        "Event ID is required."
      );
    }

    const bookingsQuery =
      query(
        collection(
          db,
          BOOKINGS_COLLECTION
        ),
        where(
          "eventId",
          "==",
          eventId
        )
      );

    const snapshot =
      await getDocs(
        bookingsQuery
      );

    return snapshot.docs.map(
      (document) => ({
        id: document.id,

        ...document.data(),
      })
    );
  };
  