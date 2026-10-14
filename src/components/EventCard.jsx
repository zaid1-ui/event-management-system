import { Link } from "react-router-dom";

function EventCard({ event }) {
  const image = event.image;

  return (
    <article className="event-card">
      <Link
        to={`/events/${event.id}`}
        className="event-image-link"
        aria-label={`View details for ${event.name}`}
      >
        <img
          className="event-image"
          src={image}
          alt={event.name}
          loading="lazy"
        />
        <span className="event-category">{event.category}</span>
      </Link>

      <div className="event-card-content">
        <p className="event-date">{event.date}</p>
        <h3>{event.name}</h3>
        <p className="event-venue">
          <span aria-hidden="true">⌖</span> {event.venue}
        </p>
        <p className="event-location">{event.location}</p>

        <Link className="event-details-link" to={`/events/${event.id}`}>
          Explore event <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
