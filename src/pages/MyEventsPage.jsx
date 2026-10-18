import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelRegistration } from "../features/registrations/registrationsSlice";

const EMPTY_REGISTRATIONS = [];

function MyEventsPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const registrations = useSelector((state) => {
    const email = state.auth.user?.email?.trim().toLowerCase();

    return email
      ? (state.registrations[email] ?? EMPTY_REGISTRATIONS)
      : EMPTY_REGISTRATIONS;
  });

  function handleCancel(eventId) {
    if (!user?.email) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?",
    );

    if (confirmed) {
      dispatch(
        cancelRegistration({
          email: user.email,
          eventId,
        }),
      );
    }
  }

  return (
    <main className="container my-events-page">
      <section className="my-events-heading">
        <span className="eyebrow">YOUR EVENTRA</span>
        <h1>My Events</h1>
        <p>Manage your registered events in one place.</p>
      </section>

      {registrations.length === 0 ? (
        <section className="empty-events">
          <h2>No registered events yet</h2>
          <p>Explore upcoming events and register for one you like.</p>
          <Link to="/" className="primary-button">
            Explore Events
          </Link>
        </section>
      ) : (
        <section className="events-grid">
          {registrations.map((event) => (
            <article className="event-card" key={event.id}>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.name}
                  className="event-image"
                />
              )}

              <div className="event-card-content">
                <span className="eyebrow">{event.category}</span>
                <h2>{event.name}</h2>

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

                {event.location && <p>{event.location}</p>}

                <div className="event-card-actions">
                  <Link to={`/events/${event.id}`} className="primary-button">
                    View Details
                  </Link>

                  <button
                    type="button"
                    className="nav-button"
                    onClick={() => handleCancel(event.id)}
                  >
                    Cancel Registration
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default MyEventsPage;
