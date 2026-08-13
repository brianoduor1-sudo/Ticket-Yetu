import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getTicketInventory,
  updateTicketInventory,
} from "../services/ticketInventoryService";

import {
  createBooking,
} from "../services/bookingService";

import {
  createTicket,
} from "../services/ticketService";

function BookingForm({
  event,
}) {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  const [inventory, setInventory] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [booking, setBooking] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadInventory =
      async () => {
        try {
          setLoading(true);

          const data =
            await getTicketInventory(
              event?.id
            );

          setInventory(data);
        } catch (error) {
          console.error(
            "Failed to load ticket inventory:",
            error
          );

          setError(
            "Unable to load ticket availability."
          );
        } finally {
          setLoading(false);
        }
      };

    if (event?.id) {
      loadInventory();
    }
  }, [event?.id]);

  const price =
    inventory?.ticketPrice ??
    event?.price ??
    0;

  const total =
    quantity * price;

  const handleBooking =
    async () => {
      if (!isAuthenticated) {
        setError(
          "Please log in before booking a ticket."
        );

        return;
      }

      if (!user) {
        setError(
          "Unable to identify the logged-in user."
        );

        return;
      }

      if (!inventory) {
        setError(
          "Ticket inventory is not available."
        );

        return;
      }

      if (
        quantity >
        inventory.availableTickets
      ) {
        setError(
          "Not enough tickets available."
        );

        return;
      }

      try {
        setBooking(true);
        setError("");
        setMessage("");

        await updateTicketInventory(
          event.id,
          quantity
        );

        const newBooking =
          await createBooking({
            userId: user.uid,
            eventId: event.id,
            quantity,
            ticketPrice: price,
          });

        for (
          let i = 0;
          i < quantity;
          i++
        ) {
          await createTicket({
            bookingId:
              newBooking.id,
            userId: user.uid,
            eventId: event.id,
          });
        }

        setMessage(
          "Booking confirmed successfully."
        );

        const updatedInventory =
          await getTicketInventory(
            event.id
          );

        setInventory(
          updatedInventory
        );

        setQuantity(1);
      } catch (error) {
        console.error(
          "Booking failed:",
          error
        );

        setError(
          error.message ||
            "Booking failed."
        );
      } finally {
        setBooking(false);
      }
    };

  if (loading) {
    return (
      <section>
        <p>
          Loading ticket availability...
        </p>
      </section>
    );
  }

  return (
    <section className="booking-form">

      <h2>
        Book Tickets
      </h2>

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

      <p>
        Price per ticket:
        {" "}
        <strong>
          KSh {price}
        </strong>
      </p>

      <p>
        Available tickets:
        {" "}
        <strong>
          {inventory?.availableTickets ??
            0}
        </strong>
      </p>

      {isAuthenticated ? (
        <>
          <label htmlFor="ticket-quantity">
            Number of tickets
          </label>

          <select
            id="ticket-quantity"
            value={quantity}
            onChange={(event) =>
              setQuantity(
                Number(
                  event.target.value
                )
              )
            }
            disabled={
              booking ||
              !inventory?.availableTickets
            }
          >
            {Array.from(
              {
                length: Math.min(
                  5,
                  inventory?.availableTickets ||
                    0
                ),
              },
              (_, index) =>
                index + 1
            ).map((number) => (
              <option
                key={number}
                value={number}
              >
                {number}
              </option>
            ))}
          </select>

          <h3>
            Total: KSh {total}
          </h3>

          <button
            type="button"
            onClick={
              handleBooking
            }
            disabled={
              booking ||
              !inventory?.availableTickets
            }
          >
            {booking
              ? "Processing..."
              : "Buy Ticket"}
          </button>
        </>
      ) : (
        <p>
          Please log in to book tickets.
        </p>
      )}

    </section>
  );
}

export default BookingForm;
