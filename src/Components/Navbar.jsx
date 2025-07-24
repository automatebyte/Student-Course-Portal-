// Import Link component for navigation without page refresh
// Import useLocation hook to know which page we're currently on
import { Link, useLocation } from 'react-router-dom';

// Import Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Navbar Component - Navigation bar that appears on every page
 * 
 * This component:
 * 1. Shows the site logo/brand name
 * 2. Displays navigation links to all main pages
 * 3. Highlights the current active page
 * 4. Includes a user dropdown menu
 * 5. Is responsive (collapses on mobile devices)
 * 
 * Features:
 * - Active link highlighting (shows which page you're on)
 * - Mobile-responsive hamburger menu
 * - Bootstrap styling for professional look
 * - User profile dropdown (for future features)
 */
function Navbar() {
  // Get current location/path to highlight active navigation link
  // This tells us which page the user is currently viewing
  const location = useLocation();
  
  return (
    // Main navigation bar with Bootstrap classes
    // navbar-expand-lg: Collapses on small screens, expands on large screens
    // navbar-dark: Dark theme for text colors
    // bg-dark: Dark background color
    // sticky-top: Stays at top when scrolling
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        {/* Brand/Logo section - appears on left side */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          {/* Graduation cap icon */}
          <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
          {/* Site name with colored "Portal" text */}
          <span>Student<span className="text-primary">Portal</span></span>
        </Link>
        
        {/* Mobile hamburger menu button - only shows on small screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation links - collapses on mobile */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Main navigation links - aligned to right with ms-auto */}
          <ul className="navbar-nav ms-auto">
            
            {/* Home link */}
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            
            {/* Dashboard link */}
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                to="/dashboard"
              >
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Link>
            </li>
            
            {/* Courses link - active if URL contains '/courses' */}
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname.includes('/courses') ? 'active' : ''}`} 
                to="/courses"
              >
                <i className="bi bi-book me-1"></i> Courses
              </Link>
            </li>
            
            {/* Assignments link - active if URL contains '/assignments' */}
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname.includes('/assignments') ? 'active' : ''}`} 
                to="/assignments"
              >
                <i className="bi bi-clipboard-check me-1"></i> Assignments
              </Link>
            </li>
            
            {/* Admin link - for administrative functions */}
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} 
                to="/admin"
              >
                <i className="bi bi-gear me-1"></i> Admin
              </Link>
            </li>
          </ul>
          
          {/* User profile section - appears on right side */}
          <div className="ms-3 d-flex align-items-center">
            {/* Dropdown menu for user actions */}
            <div className="dropdown">
              {/* User avatar/profile button */}
              <a 
                href="#" 
                className="d-flex align-items-center text-decoration-none dropdown-toggle" 
                id="userDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {/* Circular user icon */}
                <div 
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                  style={{width: '32px', height: '32px'}}
                >
                  <i className="bi bi-person-fill"></i>
                </div>
              </a>
              
              {/* Dropdown menu items */}
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                {/* Profile option */}
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-person me-2"></i>Profile
                  </a>
                </li>
                
                {/* Settings option */}
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-gear me-2"></i>Settings
                  </a>
                </li>
                
                {/* Divider line */}
                <li><hr className="dropdown-divider" /></li>
                
                {/* Sign out option */}
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-box-arrow-right me-2"></i>Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Export Navbar component so it can be used in App.jsx
export default Navbar;