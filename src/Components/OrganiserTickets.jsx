import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  createTicketInventory,
  getTicketInventory,
} from "../services/ticketInventoryService";


function OrganiserTickets() {
  const {
    user,
    isOrganiser,
    loading: authLoading,
  } = useAuth();

  const [eventId, setEventId] =
    useState("");

  const [totalTickets, setTotalTickets] =
    useState("");

  const [ticketPrice, setTicketPrice] =
    useState("");

  const [inventory, setInventory] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  /*
    Load inventory whenever the organiser
    enters an event ID.
  */
  useEffect(() => {
    const loadInventory =
      async () => {
        if (!eventId.trim()) {
          setInventory(null);
          return;
        }

        try {
          setLoading(true);
          setError("");

          const data =
            await getTicketInventory(
              eventId.trim()
            );

          setInventory(data);

          if (data) {
            setTotalTickets(
              data.totalTickets
            );

            setTicketPrice(
              data.ticketPrice
            );
          }
        } catch (error) {
          console.error(
            "Failed to load inventory:",
            error
          );

          setError(
            "Unable to load ticket inventory."
          );
        } finally {
          setLoading(false);
        }
      };

    loadInventory();
  }, [eventId]);


  const handleCreateInventory =
    async (event) => {
      event.preventDefault();

      setMessage("");
      setError("");

      if (!eventId.trim()) {
        setError(
          "Please enter an event ID."
        );

        return;
      }

      const tickets =
        Number(totalTickets);

      const price =
        Number(ticketPrice);

      if (
        !Number.isInteger(tickets) ||
        tickets <= 0
      ) {
        setError(
          "Number of tickets must be a positive whole number."
        );

        return;
      }

      if (
        Number.isNaN(price) ||
        price < 0
      ) {
        setError(
          "Please enter a valid ticket price."
        );

        return;
      }

      try {
        setLoading(true);

        const newInventory =
          await createTicketInventory({
            eventId:
              eventId.trim(),

            totalTickets:
              tickets,

            ticketPrice:
              price,
          });

        setInventory(
          newInventory
        );

        setTotalTickets(
          newInventory.totalTickets
        );

        setTicketPrice(
          newInventory.ticketPrice
        );

        setMessage(
          "Ticket inventory created successfully."
        );

      } catch (error) {
        console.error(
          "Failed to create inventory:",
          error
        );

        setError(
          error.message ||
            "Unable to create ticket inventory."
        );

      } finally {
        setLoading(false);
      }
    };


  /*
    Authentication is still loading.
  */
  if (authLoading) {
    return (
      <main className="organiser-tickets-page">
        <p>
          Loading...
        </p>
      </main>
    );
  }


  /*
    User isn't logged in.
  */
  if (!user) {
    return (
      <main className="organiser-tickets-page">

        <h1>
          Organiser Ticket Management
        </h1>

        <p>
          You must be logged in to
          access this page.
        </p>

      </main>
    );
  }


  /*
    User is logged in but isn't
    an approved organiser.
  */
  if (!isOrganiser) {
    return (
      <main className="organiser-tickets-page">

        <h1>
          Organiser Ticket Management
        </h1>

        <p>
          You don't have permission
          to manage event tickets.
        </p>

      </main>
    );
  }


  return (
    <main className="organiser-tickets-page">

      <header>
        <h1>
          Organiser Ticket Management
        </h1>

        <p>
          Configure ticket inventory
          for your events.
        </p>
      </header>


      <section className="ticket-management">

        <h2>
          Ticket Inventory
        </h2>


        <form
          onSubmit={
            handleCreateInventory
          }
        >

          <div>
            <label htmlFor="event-id">
              Event ID
            </label>

            <input
              id="event-id"
              type="text"
              value={eventId}
              onChange={(event) =>
                setEventId(
                  event.target.value
                )
              }
              placeholder="Enter event ID"
            />
          </div>


          <div>
            <label htmlFor="total-tickets">
              Number of tickets
            </label>

            <input
              id="total-tickets"
              type="number"
              min="1"
              value={totalTickets}
              onChange={(event) =>
                setTotalTickets(
                  event.target.value
                )
              }
              placeholder="e.g. 500"
            />
          </div>


          <div>
            <label htmlFor="ticket-price">
              Ticket price
            </label>

            <input
              id="ticket-price"
              type="number"
              min="0"
              value={ticketPrice}
              onChange={(event) =>
                setTicketPrice(
                  event.target.value
                )
              }
              placeholder="e.g. 1500"
            />
          </div>


          {error && (
            <p>
              {error}
            </p>
          )}


          {message && (
            <p>
              {message}
            </p>
          )}


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Create Ticket Inventory"}
          </button>

        </form>

      </section>


      {inventory && (
        <section className="inventory-summary">

          <h2>
            Current Inventory
          </h2>


          <div>
            <p>
              Event ID
            </p>

            <strong>
              {inventory.eventId}
            </strong>
          </div>


          <div>
            <p>
              Total Tickets
            </p>

            <strong>
              {inventory.totalTickets}
            </strong>
          </div>


          <div>
            <p>
              Available Tickets
            </p>

            <strong>
              {inventory.availableTickets}
            </strong>
          </div>


          <div>
            <p>
              Sold Tickets
            </p>

            <strong>
              {inventory.soldTickets}
            </strong>
          </div>


          <div>
            <p>
              Ticket Price
            </p>

            <strong>
              KSh {inventory.ticketPrice}
            </strong>
          </div>

        </section>
      )}

    </main>
  );
}

export default OrganiserTickets;
