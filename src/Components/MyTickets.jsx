import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getUserTickets,
} from "../services/ticketService";


function MyTickets() {
  const { user } = useAuth();

  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadTickets =
      async () => {
        if (!user) {
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          setError("");

          const userTickets =
            await getUserTickets(
              user.uid
            );

          setTickets(
            userTickets
          );

        } catch (error) {
          console.error(
            "Failed to load tickets:",
            error
          );

          setError(
            "Unable to load your tickets."
          );

        } finally {
          setLoading(false);
        }
      };

    loadTickets();
  }, [user]);


  if (loading) {
    return (
      <main>
        <h1>
          My Tickets
        </h1>

        <p>
          Loading tickets...
        </p>
      </main>
    );
  }


  if (error) {
    return (
      <main>
        <h1>
          My Tickets
        </h1>

        <p>
          {error}
        </p>
      </main>
    );
  }


  return (
    <main>

      <h1>
        My Tickets
      </h1>


      {tickets.length === 0 ? (
        <p>
          You don't have any
          tickets yet.
        </p>
      ) : (
        <section>

          {tickets.map(
            (ticket) => (
              <article
                key={ticket.id}
                className="ticket-card"
              >

                <h2>
                  Ticket
                </h2>

                <p>
                  Ticket Code:
                </p>

                <strong>
                  {ticket.ticketCode}
                </strong>

                <p>
                  Event ID:
                  {" "}
                  {ticket.eventId}
                </p>

                <p>
                  Status:
                  {" "}
                  {ticket.status}
                </p>

                <p>
                  Purchased:
                  {" "}
                  {ticket.createdAt
                    ?.toDate
                    ? ticket.createdAt
                        .toDate()
                        .toLocaleString()
                    : "Processing..."}
                </p>

              </article>
            )
          )}

        </section>
      )}

    </main>
  );
}

export default MyTickets;
