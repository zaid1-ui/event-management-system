import { Link } from "react-router-dom";

function EventCard({ event }) {
  const formattedDate = event.date
    ? new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date to be announced";

  return (
    <article className="event-card">
      <Link
        to={`/events/${event.id}`}
        className="event-image-link"
        aria-label={`View details for ${event.name}`}
      >
        {event.image ? (
          <img
            className="event-image"
            src={event.image}
            alt={event.name}
            loading="lazy"
          />
        ) : (
          <div className="event-image event-image-placeholder">Eventra</div>
        )}

        <span className="event-category">{event.category}</span>
      </Link>

      <div className="event-card-content">
        <p className="event-date">{formattedDate}</p>
        <h3>{event.name}</h3>
        <p className="event-venue">{event.venue}</p>
        <p className="event-location">
          {event.location || "Location unavailable"}
        </p>

        {event.url ? (
          <a
            className="event-details-link"
            href={event.url}
            target="_blank"
            rel="noreferrer"
          >
            Ticketmaster details <span aria-hidden="true">→</span>
          </a>
        ) : (
          <Link className="event-details-link" to={`/events/${event.id}`}>
            Explore event <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default EventCard;
