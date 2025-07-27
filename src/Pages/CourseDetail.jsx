// Import React hooks for managing component state and side effects
import { useState, useEffect } from 'react';

// Import useParams hook to get URL parameters (like course ID)
import { useParams } from 'react-router-dom';

/**
 * CourseDetail Component - Shows detailed information about a single course
 * 
 * This component:
 * 1. Gets the course ID from the URL (e.g., /courses/1 -> ID is 1)
 * 2. Fetches detailed course data from your backend
 * 3. Displays loading and error states
 * 4. Renders full course information
 */
function CourseDetail() {
  // Get course ID from the route (e.g., /courses/:id)
  const { id } = useParams();

  // State to store course object
  const [course, setCourse] = useState(null);
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // State to capture any fetch errors
  const [error, setError] = useState(null);

  // Fetch course data on component mount or when ID changes
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        
        const response = await fetch(`https://student-course-api-3.onrender.com/courses/${id}`);
        
        // Throw an error if request fails
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }

        // Parse response and update state
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (err) {
        // Handle fetch errors
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Show error alert if fetch fails
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  // Main detailed view layout
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>{course?.code}: {course?.title}</h2>
        </div>
        <div className="card-body">
          <p><strong>Instructor:</strong> {course?.instructor}</p>
          <p><strong>Schedule:</strong> {course?.schedule}</p>
          <p><strong>Credits:</strong> {course?.credits}</p>
          <p><strong>Description:</strong> {course?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
