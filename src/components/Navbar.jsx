import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link to="/" className="brand">
          Eventra<span>.</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            Explore
          </NavLink>

          {isAuthenticated && <NavLink to="/my-events">My Events</NavLink>}
        </div>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hi, {user?.name || "there"}</span>

              <button
                type="button"
                className="nav-button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Log In
              </Link>

              <Link to="/register" className="nav-register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
