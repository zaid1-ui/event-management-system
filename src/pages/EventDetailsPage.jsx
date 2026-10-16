import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEvents } from "../services/ticketmaster";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchEvents({ size: 50 });
        const foundEvent = result.events.find(
          (item) => String(item.id) === String(id),
        );

        if (!cancelled) {
          if (foundEvent) {
            setEvent(foundEvent);
          } else {
            setError("We couldn't find this event in the current results.");
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load event details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="container details-message">
        <p>Loading event details...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="container details-message">
        <h1>Event not found</h1>
        <p>{error || "This event is unavailable."}</p>
        <Link className="button" to="/">
          Back to events
        </Link>
      </main>
    );
  }

  return (
    <main className="container event-details">
      <Link className="back-link" to="/">
        ← Back to events
      </Link>

      {event.image && (
        <img className="details-image" src={event.image} alt={event.name} />
      )}

      <div className="details-content">
        <span className="eyebrow">{event.category}</span>
        <h1>{event.name}</h1>

        <div className="details-info">
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          {event.time && (
            <p>
              <strong>Time:</strong> {event.time}
            </p>
          )}
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          {event.location && (
            <p>
              <strong>Location:</strong> {event.location}
            </p>
          )}
        </div>

        <div className="details-description">
          <h2>About this event</h2>
          <p>
            {event.info ||
              "Get ready for this experience. Visit the official event page for more information."}
          </p>
        </div>

        {event.url && (
          <a
            className="button"
            href={event.url}
            target="_blank"
            rel="noreferrer"
          >
            View official event <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </main>
  );
}

export default EventDetailsPage;
