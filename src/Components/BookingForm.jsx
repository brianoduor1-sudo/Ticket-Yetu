import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getTicketInventory,
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
          setError("");

          const data =
            await getTicketInventory(
              event?.id
            );

          setInventory(data);
        } catch (error) {
          console.error(
            "Ticket inventory error:",
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
          "Tickets are not available for this event."
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

        /*
          createBooking() reserves the tickets
          before creating the booking.
        */
        const newBooking =
          await createBooking({
            userId: user.uid,

            eventId: event.id,

            quantity,

            ticketPrice:
              inventory.ticketPrice,
          });


        /*
          Create one ticket for every
          ticket purchased.
        */
        for (
          let index = 0;
          index < quantity;
          index++
        ) {
          await createTicket({
            bookingId:
              newBooking.id,

            userId: user.uid,

            eventId: event.id,
          });
        }


        setMessage(
          "Booking confirmed! Your ticket(s) have been created."
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
      <section className="booking-form">
        <p>
          Checking ticket availability...
        </p>
      </section>
    );
  }


  /*
    The event exists but nobody has
    configured tickets for it.
  */
  if (!inventory) {
    return (
      <section className="booking-form">

        <h2>
          Tickets
        </h2>

        <p>
          Tickets are not currently
          available for this event.
        </p>

      </section>
    );
  }


  /*
    Tickets exist but are sold out.
  */
  if (
    inventory.availableTickets <= 0
  ) {
    return (
      <section className="booking-form">

        <h2>
          Tickets
        </h2>

        <p>
          Sold Out
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
        Ticket price:
        {" "}
        <strong>
          KSh{" "}
          {inventory.ticketPrice}
        </strong>
      </p>


      <p>
        Available:
        {" "}
        <strong>
          {inventory.availableTickets}
        </strong>
      </p>


      {!isAuthenticated ? (
        <p>
          Please log in to book
          tickets.
        </p>
      ) : (
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
            disabled={booking}
          >
            {Array.from(
              {
                length: Math.min(
                  5,
                  inventory.availableTickets
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


          <p>
            Total:
            {" "}
            <strong>
              KSh{" "}
              {quantity *
                inventory.ticketPrice}
            </strong>
          </p>


          <button
            type="button"
            onClick={
              handleBooking
            }
            disabled={booking}
          >
            {booking
              ? "Processing..."
              : "Buy Ticket"}
          </button>

        </>
      )}

    </section>
  );
}

export default BookingForm;
