import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventCard from "./components/EventCard";
import { fetchEvents } from "./services/ticketmaster";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadEvents() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchEvents({
          keyword,
          classificationName: category,
          page,
          size: 12,
        });

        if (!ignore) {
          setEvents(result.events);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to load events.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      ignore = true;
    };
  }, [keyword, category, page]);

  function handleSearch(event) {
    event.preventDefault();
    setPage(0);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    setPage(0);
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <span className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</span>
          <h1>
            Find your people.
            <br />
            <span>Feel the moment.</span>
          </h1>
          <p>
            Discover concerts, festivals, sports, and experiences worth
            remembering.
          </p>
          <div className="hero-actions">
            <a className="button" href="#events">
              Explore events <span aria-hidden="true">→</span>
            </a>
            <Link className="button button-outline" to="/register">
              Join Eventra
            </Link>
          </div>
          <div className="hero-note">
            <span className="status-dot" />
            Your next favorite experience is out there.
          </div>
        </div>
      </section>

      <section className="intro-section container" id="events">
        <div>
          <span className="eyebrow">MADE FOR THE MOMENTS THAT MATTER</span>
          <h2>Something worth going out for.</h2>
        </div>
        <p>
          From live music to unforgettable match days, find events that bring
          people together.
        </p>
      </section>

      <section className="events-section container" id="categories">
        <div className="events-heading">
          <div>
            <span className="eyebrow">THE EVENT COLLECTION</span>
            <h2>Find your next experience.</h2>
            <p>Search real events and filter by category.</p>
          </div>
          <span className="events-count">
            {loading ? "Loading events..." : `${events.length} events shown`}
          </span>
        </div>

        <form className="event-filters" onSubmit={handleSearch}>
          <label className="search-field">
            <span>Search events</span>
            <input
              type="search"
              placeholder="Try a concert, artist, or event..."
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                setPage(0);
              }}
            />
          </label>

          <label className="category-field">
            <span>Category</span>
            <select value={category} onChange={handleCategoryChange}>
              <option value="">All categories</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Arts & Theatre">Arts & Theatre</option>
              <option value="Film">Film</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </label>

          <button className="button filter-button" type="submit">
            Search
          </button>
        </form>

        {error && (
          <div className="events-message error-message" role="alert">
            <h3>Couldn't load events</h3>
            <p>{error}</p>
            <button
              className="button"
              type="button"
              onClick={() => setPage((current) => current)}
            >
              Try again
            </button>
          </div>
        )}

        {loading && !error && (
          <p className="events-message" role="status">
            Loading events from Ticketmaster...
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="events-message">
            <h3>No events found</h3>
            <p>Try another search term or select a different category.</p>
          </div>
        )}

        {!error && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="pagination">
            <button
              className="button button-outline"
              type="button"
              disabled={page === 0}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button
              className="button button-outline"
              type="button"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <main className="container not-found">
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
