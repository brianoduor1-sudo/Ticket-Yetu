import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getUserTickets } from "../services/ticketService";

function MyTickets() {
  const { user } = useAuth();

  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userTickets =
          await getUserTickets(user.uid);

        setTickets(userTickets);
      } catch (error) {
        console.error(
          "Failed to load tickets:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [user]);

  if (!user) {
    return (
      <p>
        Please log in to view your tickets.
      </p>
    );
  }

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  return (
    <div>
      <h1>My Tickets</h1>

      {tickets.length === 0 ? (
        <p>
          You don't have any tickets yet.
        </p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id}>
            <h3>
              {ticket.eventTitle}
            </h3>

            <p>
              Ticket Number:{" "}
              {ticket.ticketNumber}
            </p>

            <p>
              Status: {ticket.status}
            </p>

            <p>
              Checked in:{" "}
              {ticket.checkedIn
                ? "Yes"
                : "No"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyTickets;
