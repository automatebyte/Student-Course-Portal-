// Import React hooks for managing component state and side effects
import { useState, useEffect } from 'react';

// Import useParams hook to get URL parameters (like course ID)
import { useParams } from 'react-router-dom';

/**
 * CourseDetail Component - Shows detailed information about a single course
 * 
 * This component:
 * 1. Gets the course ID from the URL (e.g., /courses/1 -> ID is 1)
 * 2. Fetches detailed course data from our JSON server
 * 3. Shows a loading spinner while data is being fetched
 * 4. Displays course information in a detailed card layout
 * 5. Handles errors if data fetching fails
 * 
 * URL Structure: /courses/:id
 * - :id is a parameter that gets passed to this component
 * - Example: /courses/1 will show details for course with ID 1
 * 
 * State variables explained:
 * - course: Object to store single course data from the server
 * - loading: Boolean to show/hide loading spinner
 * - error: String to store any error messages
 */
function CourseDetail() {
  // Extract the course ID from the URL parameters
  const { id } = useParams();
  
  // State to store the single course data from the server
  const [course, setCourse] = useState(null);
  
  // State to show loading spinner while fetching data
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState(null);

  // useEffect runs when component loads or when ID changes
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // ✅ Fixed fetch URL to use correct backend path
        const response = await fetch(`https://student-course-api.onrender.com/courses/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

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
