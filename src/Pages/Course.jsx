/*
// Import React hooks for managing state and side effects
import { useState, useEffect } from 'react';
// Import Link for navigation to individual course pages
import { Link } from 'react-router-dom';

// Courses component - displays all available courses in a grid layout
function Courses() {
  // State to store the list of courses from the server
  const [courses, setCourses] = useState([]);
  // State to show loading spinner while fetching data
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState(null);

  // useEffect runs when component loads - fetches course data from server
  useEffect(() => {
    // Async function to get courses from our JSON server
    const fetchCourses = async () => {
      try {
        // Make API call to get all courses
        const response = await fetch('http://localhost:3001/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        let data = await response.json();

        // Fix instructor names for demo purposes (update specific courses)
        data = data.map(course => {
          if (course.id === "1") {
            return { ...course, instructor: "Dr. Abubakar Sheikh" };
          } else if (course.id === "2") {
            return { ...course, instructor: "Dr. Brian Kemeu" };
          } else if (course.id === "3") {
            return { ...course, instructor: "Prof. Emmanuel Kerich" };
          }
          return course; // Keep other courses unchanged
        });

        setCourses(data);     // Store courses in state
        setLoading(false);    // Hide loading spinner
      } catch (err) {
        setError(err.message); // Store error message
        setLoading(false);     // Hide loading spinner
      }
    };

    fetchCourses(); // Call the function when component mounts
  }, []); // Empty array means this only runs once

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

  // Main courses page layout
  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Courses</h2>

      {/* Bootstrap grid to display courses in cards */}
      <div className="row">
        {/* Loop through each course and create a card */}
        {courses.map(course => (
          <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
            {/* Course card with equal height */}
            <div className="card h-100">
              {/* Card header with course code and title */}
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{course.code}: {course.title}</h5>
              </div>
              {/* Card body with course details */}
              <div className="card-body">
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Schedule:</strong> {course.schedule}</p>
                <p><strong>Credits:</strong> {course.credits}</p>
                <p className="card-text">{course.description}</p>
                {/* Link to individual course detail page */}
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
*/