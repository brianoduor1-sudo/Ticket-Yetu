export const formatApiEvent = (apiEvent) => {
  return {
    id: `api-${apiEvent.id}`,
    externalId: apiEvent.id,
    source: "api",

    title: apiEvent.name,
    description: apiEvent.description || "",
    category: apiEvent.category || "Other",

    imageUrl: apiEvent.image || "",

    date: apiEvent.date || null,
    venue: apiEvent.venue || "",
    location: apiEvent.location || "",

    ticketingEnabled: false,

    totalTickets: 0,
    availableTickets: 0,

    ticketPrice: 0,
    currency: "KES",
  };
};
