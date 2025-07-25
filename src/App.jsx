// Import necessary React Router components for navigation between pages
// BrowserRouter: Enables routing in our React app
// Routes: Container for all our route definitions
// Route: Defines individual routes and which component to show
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Bootstrap CSS for styling - gives us pre-built CSS classes
import 'bootstrap/dist/css/bootstrap.min.css'

// Import our custom CSS file for additional styling
import './App.css'

// Import our navigation bar component that appears on every page
import Navbar from './Components/Navbar'

// Import all the page components that users can navigate to
import Home from './Pages/Home'           // Landing page - first page users see
import Dashboard from './Pages/Dashboard' // Student's main dashboard with overview
import Courses from './Pages/Course'      // List of all available courses
import CourseDetail from './Pages/CourseDetail' // Detailed view of a single course
import Assignments from './Pages/Assignments'   // List of all assignments
import Assignment from './Pages/Assignment'     // Individual assignment view
import Admin from './Pages/Admin'         // Admin panel for managing data

/**
 * Main App Component - This is the root component of our entire application
 * 
 * What this component does:
 * 1. Sets up routing so users can navigate between different pages
 * 2. Displays the navigation bar on every page
 * 3. Defines which component to show for each URL path
 * 
 * How routing works:
 * - When user visits '/', they see the Home component
 * - When user visits '/dashboard', they see the Dashboard component
 * - When user visits '/courses/123', they see CourseDetail for course with ID 123
 * - And so on...
 */
function App() {
  return (
    // Router wrapper - enables routing functionality for the entire app
    <Router>
      {/* Navigation bar - appears on every page */}
      <Navbar />
      
      {/* Main content area with padding */}
      <main className="py-4">
        {/* Routes container - defines all possible page routes */}
        <Routes>
          {/* Home page route - shows when user visits the root URL */}
          <Route path="/" element={<Home />} />
          
          {/* Dashboard route - shows student's main overview */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Courses list route - shows all available courses */}
          <Route path="/courses" element={<Courses />} />
          
          {/* Individual course route - :id is a parameter (e.g., /courses/1) */}
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          {/* Assignments list route - shows all assignments */}
          <Route path="/assignments" element={<Assignments />} />
          
          {/* Individual assignment route */}
          <Route path="/assignments/:id" element={<Assignment />} />
          
          {/* Admin panel route - for managing the system */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  )
}

// Export the App component so it can be used in other files (like main.jsx)
export default App