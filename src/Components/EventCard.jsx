import { Link } from "react-router-dom";

function EventCard({
  event,
}) {
  return (
    <article className="event-card">

      <div className="event-image">
        {event?.image ? (
          <img
            src={event.image}
            alt={event.title}
          />
        ) : (
          <div>
            Event Image
          </div>
        )}
      </div>

      <div className="event-content">

        <span>
          {event?.category ||
            "Event"}
        </span>

        <h3>
          {event?.title ||
            "Event Title"}
        </h3>

        <p>
          {event?.description ||
            "Event description."}
        </p>

        <p>
          📅{" "}
          {event?.date ||
            "Date TBA"}
        </p>

        <p>
          📍{" "}
          {event?.location ||
            "Location TBA"}
        </p>

        {event?.price !==
          undefined && (
          <p>
            🎟️ KSh{" "}
            {event.price}
          </p>
        )}

        <Link
          to={`/events/${
            event?.id ||
            "unknown"
          }`}
        >
          <button type="button">
            View Event
          </button>
        </Link>

      </div>

    </article>
  );
}

export default EventCard;
