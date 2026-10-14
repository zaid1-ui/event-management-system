import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventCard from "./components/EventCard";
import { mockEvents } from "./features/events/mockEvents";

function HomePage() {
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
            <p>
              Explore a few of the experiences our platform will bring together.
            </p>
          </div>
          <span className="events-count">
            {mockEvents.length} featured events
          </span>
        </div>

        <div className="events-grid">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
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
