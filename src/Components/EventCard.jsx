import { Link } from "react-router-dom";

function EventCard({ event }) {
  const image =
    event?.images?.find(
      (img) => img.width >= 640
    )?.url ||
    event?.images?.[0]?.url;

  const venue =
    event?._embedded?.venues?.[0];

  const category =
    event?.classifications?.[0]
      ?.segment?.name ||
    "Event";

  const date =
    event?.dates?.start
      ?.localDate ||
    "Date TBA";

  const time =
    event?.dates?.start
      ?.localTime ||
    "TBA";

  const location = [
    venue?.name,
    venue?.city?.name,
  ]
    .filter(Boolean)
    .join(", ");

  const price =
    event?.priceRanges?.[0];

  const ticketStatus =
    event?.dates?.status?.code ===
    "onsale"
      ? "Tickets Available"
      : "Check availability";

  return (
    <article className="card">

      {image ? (
        <img
          src={image}
          alt={
            event?.name ||
            "Event"
          }
          className="card-image"
        />
      ) : (
        <div className="card-image">
          Event Image
        </div>
      )}


      <div className="card-body">

        <span className="badge">
          {category}
        </span>


        <h3>
          {event?.name ||
            "Event Title"}
        </h3>


        <p>
          📅 {date}
        </p>


        <p>
          ⏰ {time}
        </p>


        <p>
          📍{" "}
          {location ||
            "Location TBA"}
        </p>


        <p>
          💰{" "}
          {price
            ? `KES ${price.min} - ${price.max}`
            : "Price not available"}
        </p>


        <p>
          🎟️{" "}
          {ticketStatus}
        </p>


        <Link
          to={`/events/${event?.id}`}
          className="btn"
        >
          View Event
        </Link>

      </div>

    </article>
  );
}

export default EventCard;
