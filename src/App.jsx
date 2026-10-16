import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventCard from "./components/EventCard";
import ProtectedRoute from "./components/ProtectedRoute";

import { fetchEvents } from "./services/ticketmaster";

import EventDetailsPage from "./pages/EventDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyEventsPage from "./pages/MyEventsPage";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      setLoading(true);
      setError("");

      try {
        const results = await fetchEvents({
          keyword,
          category,
          page,
        });

        if (!cancelled) {
          setEvents(results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load events. Please try again.");
          setEvents([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, [keyword, category, page]);

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
    setPage(0);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    setPage(0);
  }

  function handleRetry() {
    setPage((currentPage) => currentPage + 1);
    setPage((currentPage) => currentPage);
  }

  return (
    <main>
      <section className="hero container">
        <span className="eyebrow">DISCOVER YOUR NEXT EXPERIENCE</span>

        <h1>
          Find events.
          <br />
          Make <span>memories.</span>
        </h1>

        <p>
          Explore concerts, sports, arts, and live experiences happening near
          you.
        </p>

        <a href="#discover" className="primary-button">
          Explore Events
        </a>
      </section>

      <section className="events-section container" id="discover">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT'S HAPPENING</span>
            <h2>Discover events</h2>
          </div>

          <span className="event-count">{events.length} events</span>
        </div>

        <div className="event-filters">
          <input
            type="search"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="Search events..."
            aria-label="Search events"
          />

          <select
            value={category}
            onChange={handleCategoryChange}
            aria-label="Filter events by category"
          >
            <option value="">All categories</option>
            <option value="KZFzniwnSyZfZ7v7nJ">Music</option>
            <option value="KZFzniwnSyZfZ7v7nE">Sports</option>
            <option value="KZFzniwnSyZfZ7v7na">Arts & Theatre</option>
            <option value="KZFzniwnSyZfZ7v7nn">Family</option>
            <option value="KZFzniwnSyZfZ7v7n1">Film</option>
          </select>
        </div>

        {loading && <p className="status-message">Loading events...</p>}

        {!loading && error && (
          <div className="status-message">
            <p>{error}</p>
            <button
              type="button"
              className="primary-button"
              onClick={handleRetry}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="status-message">
            No events found. Try a different search or category.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="container not-found">
      <span className="eyebrow">404 ERROR</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="primary-button">
        Back to events
      </Link>
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/events/:id" element={<EventDetailsPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEventsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
