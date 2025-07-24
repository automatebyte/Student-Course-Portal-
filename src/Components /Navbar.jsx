import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  // Get current route location to highlight active nav items
  const location = useLocation();
  
  return (
    // Main navbar with sticky positioning and dark theme
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        {/* Brand logo/name with icon */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
          <span>Student<span className="text-primary">Portal</span></span>
        </Link>

        {/* Mobile menu toggle button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main navigation links - collapses on mobile */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home link */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>

            {/* Dashboard link */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Link>
            </li>

            {/* Courses link (active for all sub-routes) */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname.includes('/courses') ? 'active' : ''}`} to="/courses">
                <i className="bi bi-book me-1"></i> Courses
              </Link>
            </li>

            {/* Assignments link (active for all sub-routes) */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname.includes('/assignments') ? 'active' : ''}`} to="/assignments">
                <i className="bi bi-clipboard-check me-1"></i> Assignments
              </Link>
            </li>

            {/* Admin link */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">
                <i className="bi bi-gear me-1"></i> Admin
              </Link>
            </li>
          </ul>

          {/* User profile dropdown */}
          <div className="ms-3 d-flex align-items-center">
            <div className="dropdown">
              <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" 
                 id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                     style={{width: '32px', height: '32px'}}>
                  <i className="bi bi-person-fill"></i>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right me-2"></i>Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;