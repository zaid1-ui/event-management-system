import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    dispatch(
      login({
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
      }),
    );

    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }

  return (
    <main className="auth-page container">
      <section className="auth-card">
        <span className="eyebrow">WELCOME BACK</span>

        <h1>Log in to Eventra</h1>

        <p className="auth-description">
          Sign in to manage your events and discover what's happening next.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            autoComplete="current-password"
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-button">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
