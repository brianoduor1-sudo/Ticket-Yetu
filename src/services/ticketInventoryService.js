import {
  doc,
  getDoc,
  setDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const INVENTORY_COLLECTION =
  "ticketInventory";


export const createTicketInventory = async ({
  eventId,
  totalTickets,
  ticketPrice,
}) => {
  if (!eventId) {
    throw new Error(
      "Event ID is required."
    );
  }

  if (
    !Number.isInteger(totalTickets) ||
    totalTickets <= 0
  ) {
    throw new Error(
      "Total tickets must be a positive whole number."
    );
  }

  if (
    typeof ticketPrice !== "number" ||
    ticketPrice < 0
  ) {
    throw new Error(
      "Ticket price must be a valid number."
    );
  }

  const inventoryRef = doc(
    db,
    INVENTORY_COLLECTION,
    String(eventId)
  );

  const existing =
    await getDoc(inventoryRef);

  if (existing.exists()) {
    return {
      id: existing.id,
      ...existing.data(),
    };
  }

  const inventory = {
    eventId: String(eventId),

    totalTickets,

    availableTickets:
      totalTickets,

    soldTickets: 0,

    ticketPrice,

    createdAt:
      serverTimestamp(),
  };

  await setDoc(
    inventoryRef,
    inventory
  );

  return inventory;
};


export const getTicketInventory =
  async (eventId) => {
    if (!eventId) {
      throw new Error(
        "Event ID is required."
      );
    }

    const inventoryRef = doc(
      db,
      INVENTORY_COLLECTION,
      String(eventId)
    );

    const snapshot =
      await getDoc(inventoryRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  };


/*
  Atomically reserves tickets.

  This is important because two users
  might try to buy the final tickets
  at the same time.
*/
export const reserveTickets = async (
  eventId,
  quantity
) => {
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

  const inventoryRef = doc(
    db,
    INVENTORY_COLLECTION,
    String(eventId)
  );

  return await runTransaction(
    db,
    async (transaction) => {
      const snapshot =
        await transaction.get(
          inventoryRef
        );

      if (!snapshot.exists()) {
        throw new Error(
          "Ticket inventory not found."
        );
      }

      const inventory =
        snapshot.data();

      if (
        inventory.availableTickets <
        quantity
      ) {
        throw new Error(
          "Not enough tickets available."
        );
      }

      const newAvailable =
        inventory.availableTickets -
        quantity;

      const newSold =
        inventory.soldTickets +
        quantity;

      transaction.update(
        inventoryRef,
        {
          availableTickets:
            newAvailable,

          soldTickets:
            newSold,
        }
      );

      return {
        ...inventory,

        availableTickets:
          newAvailable,

        soldTickets:
          newSold,
      };
    }
  );
};
