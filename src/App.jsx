import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Components
import Navbar from './Components /Navbar'

// Pages
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Courses from './Pages/Courses'
import CourseDetail from './Pages/CourseDetail'
import Assignments from './Pages/Assignments'
import Admin from './Pages/Admin'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/assignments/:id" element={<Assignments />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
