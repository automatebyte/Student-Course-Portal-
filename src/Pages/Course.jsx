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
  // Initially empty array [], will be filled when data loads
  const [courses, setCourses] = useState([]);
  
  // State to show loading spinner while fetching data
  // Initially true, becomes false when data loads or error occurs
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  // Initially null, gets error message if something goes wrong
  const [error, setError] = useState(null);

  // useEffect runs when component loads - fetches course data from server
  // The empty array [] means this only runs once when component first loads
  useEffect(() => {
    // Async function to get courses from our JSON server
    // We use async/await to handle the API call properly
    const fetchCourses = async () => {
      try {
        // ✅ FIXED: Correct backend URL + removed syntax error
        const response = await fetch("https://student-course-api.onrender.com/courses");
        
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        // Convert response to JSON format
        let data = await response.json();

        // Fix instructor names for demo purposes (update specific courses)
        // This is just for demonstration - in real app, data would come correctly from database
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

        // Update state with the fetched courses
        setCourses(data);
        
        // Hide loading spinner since data has loaded
        setLoading(false);
      } catch (err) {
        // If anything goes wrong, store the error message
        setError(err.message);
        
        // Hide loading spinner even if there's an error
        setLoading(false);
      }
    };

    // Call the function when component mounts
    fetchCourses();
  }, []); // Empty dependency array means this only runs once

  // Show loading spinner while courses are being fetched
  // This displays a Bootstrap spinner component
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
  // This displays a Bootstrap alert component
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
        {/* Loop through each course and create a card */}
        {/* map() creates a new component for each course in the array */}
        {courses.map(course => (
          <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
            {/* Course card with equal height */}
            {/* h-100 makes all cards the same height */}
            <div className="card h-100">
              {/* Card header with course code and title */}
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{course.code}: {course.title}</h5>
              </div>
              
              {/* Card body with course details */}
              <div className="card-body">
                {/* Display course information */}
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Schedule:</strong> {course.schedule}</p>
                <p><strong>Credits:</strong> {course.credits}</p>
                <p className="card-text">{course.description}</p>
                
                {/* Link to individual course detail page */}
                {/* Uses template literal to create dynamic URL */}
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
