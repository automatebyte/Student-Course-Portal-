// Import React hooks for managing component state and side effects
// useState: Manages component state (data that can change)
// useEffect: Runs code when component loads or updates
import { useState, useEffect } from 'react';

// Import Link component for navigation to other pages
import { Link } from 'react-router-dom';

/**
 * Courses Component - Displays all available courses in a grid layout
 * 
 * This component:
 * 1. Fetches course data from our JSON server when it loads
 * 
 * State variables explained:
 * - courses: Array to store all course data from the server
 */
function Courses() {
  // State to store the list of courses from the server
  const [courses, setCourses] = useState([]);
  
  // State to show loading spinner while fetching data
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState(null);

  // useEffect runs when component loads - fetches course data from server
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        
        const response = await fetch("https://student-course-api-3.onrender.com/courses");

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        let data = await response.json();

        // Optional fix: override instructor names for demo
        data = data.map(course => {
          if (course.id === "1") return { ...course, instructor: "Dr. Abubakar Sheikh" };
          if (course.id === "2") return { ...course, instructor: "Dr. Brian Kemeu" };
          if (course.id === "3") return { ...course, instructor: "Prof. Emmanuel Kerich" };
          return course;
        });

        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Show loading spinner while courses are being fetched
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  // Main courses page layout - only shows if data loaded successfully
  return (
    <div className="container mt-4">
      {/* Page title */}
      <h2 className="mb-4">My Courses</h2>

      {/* Bootstrap grid to display courses in cards */}
      <div className="row">
        {courses.map(course => (
          <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{course.code}: {course.title}</h5>
              </div>
              <div className="card-body">
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Schedule:</strong> {course.schedule}</p>
                <p><strong>Credits:</strong> {course.credits}</p>
                <p className="card-text">{course.description}</p>
                <Link to={`/courses/${course.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export Courses component so it can be used in App.jsx
export default Courses;
