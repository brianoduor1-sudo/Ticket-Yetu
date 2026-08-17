import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const eventsCollection = collection(db, "events");

export const createEvent = async (eventData) => {
  const docRef = await addDoc(eventsCollection, {
    ...eventData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const getEvents = async () => {
  const snapshot = await getDocs(eventsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getPublishedEvents = async () => {
  const q = query(
    eventsCollection,
    where("status", "==", "published")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getEventById = async (eventId) => {
  const eventRef = doc(db, "events", eventId);
  const snapshot = await getDoc(eventRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const updateEvent = async (
  eventId,
  updates
) => {
  const eventRef = doc(db, "events", eventId);

  await updateDoc(eventRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};
