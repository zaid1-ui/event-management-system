import { Link, Route, Routes } from "react-router-dom";

function HomePage() {
  return (
    <main>
      <h1>Event Management System</h1>
      <p>Discover events and manage your registrations.</p>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
