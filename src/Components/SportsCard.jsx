import { Link } from "react-router-dom";

function SportsCard({
  event,
}) {
  return (
    <article className="sports-card">

      <div className="sports-image">

        {event?.image ? (
          <img
            src={event.image}
            alt={event.title}
          />
        ) : (
          <div>
            Sports Image
          </div>
        )}

      </div>

      <div className="sports-content">

        <span>
          SPORTS
        </span>

        <h3>
          {event?.title ||
            "Sports Event"}
        </h3>

        <p>
          {event?.description ||
            "Sports event description."}
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

export default SportsCard;
