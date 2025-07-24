// Importing necessary components from react-router-dom for page navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Importing Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css'
// Importing custom CSS for additional styling
import './App.css'

// Components
import Navbar from './components/Navbar' // The navigation bar that appears on all pages

// Pages - these are the different views of our application
import Home from './pages/Home'             // The landing page
import Dashboard from './pages/Dashboard'   // Student dashboard overview
import Courses from './pages/Courses'      // List of all courses
import CourseDetail from './pages/CourseDetail' // Details for a specific course
import Assignments from './pages/Assignments'  // Student assignments
import Admin from './pages/Admin'          // Admin control panel

function App() {
  return (
    // Router component wraps our entire application to enable navigation
    <Router>
      {/* Navbar appears at the top of every page */}
      <Navbar />
      
      {/* Main content area with padding */}
      <main className="py-4">
        {/* Routes component defines all our application paths */}
        <Routes>
          {/* Home page - shown when URL is just "/" */}
          <Route path="/" element={<Home />} />
          
          {/* Dashboard page - student overview */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Courses listing page */}
          <Route path="/courses" element={<Courses />} />
          
          {/* Dynamic route for specific course details */}
          {/* ":id" will be replaced with actual course ID (like courses/101) */}
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          {/* Assignments page */}
          <Route path="/assignments" element={<Assignments />} />
          
          {/* Dynamic route for specific assignment */}
          <Route path="/assignments/:id" element={<Assignments />} />
          
          {/* Admin panel - restricted access */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
