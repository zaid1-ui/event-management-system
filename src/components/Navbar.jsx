import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand">
          <span className="brand-mark">E</span>
          <span>Eventra</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            Discover
          </NavLink>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="nav-login">
            Log in
          </Link>
          <Link to="/register" className="button button-small">
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
