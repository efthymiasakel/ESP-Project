import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import "./Navbar.css"; //  εδώ τραβάμε το css αρχείο

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left - ESP */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          ESP
        </Link>
      </div>

      {/* Center - Links */}
      <div className="navbar-center">
        <NavItem to="/" label="Home" />
        {user && (
          <>
            <NavItem to="/create" label="Create" />
            <NavItem to="/run" label="Demo Run" />
            <NavItem to="/dashboard" label="Dashboard" />
          </>
        )}
        {!user && (
          <>
            <NavItem to="/login" label="Login" />
            <NavItem to="/signup" label="Signup" />
          </>
        )}
      </div>

      {/* Right - Email + Logout */}
      <div className="navbar-right">
        {user && (
          <>
            <span className="email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// Helper για links
const NavItem = ({ to, label }) => (
  <NavLink to={to} className="nav-link">
    {label}
  </NavLink>
);

export default Navbar;












