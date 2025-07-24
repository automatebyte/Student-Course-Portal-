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
  // If URL is /courses/123, then id will be "123"
  const { id } = useParams();
  
  // State to store the single course data from the server
  // Initially null, will be filled when data loads
  const [course, setCourse] = useState(null);
  
  // State to show loading spinner while fetching data
  // Initially true, becomes false when data loads or error occurs
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  // Initially null, gets error message if something goes wrong
  const [error, setError] = useState(null);

  // useEffect runs when component loads or when ID changes
  // The [id] dependency means this runs again if the course ID changes
  useEffect(() => {
    // Async function to get specific course from our JSON server
    // We use async/await to handle the API call properly
    const fetchCourse = async () => {
      try {
        // Make API call to get specific course by ID from our local JSON server
        // Template literal (backticks) allows us to insert the ID into the URL
        const response = await fetch(`http://localhost:3001/courses/${id}`);
        
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        
        // Convert response to JSON format
        const data = await response.json();
        
        // Update state with the fetched course
        setCourse(data);
        
        // Hide loading spinner since data has loaded
        setLoading(false);
      } catch (err) {
        // If anything goes wrong, store the error message
        setError(err.message);
        
        // Hide loading spinner even if there's an error
        setLoading(false);
      }
    };

    // Call the function when component mounts or ID changes
    fetchCourse();
  }, [id]); // Dependency array includes 'id' so effect runs when ID changes

  // Show loading spinner while course is being fetched
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

  // Main course detail layout - only shows if data loaded successfully
  return (
    <div className="container mt-4">
      {/* Single course card with detailed information */}
      <div className="card">
        {/* Card header with course code and title */}
        <div className="card-header bg-primary text-white">
          {/* Optional chaining (?.) prevents errors if course is null */}
          <h2>{course?.code}: {course?.title}</h2>
        </div>
        
        {/* Card body with all course details */}
        <div className="card-body">
          {/* Instructor information */}
          <p><strong>Instructor:</strong> {course?.instructor}</p>
          
          {/* Class schedule */}
          <p><strong>Schedule:</strong> {course?.schedule}</p>
          
          {/* Credit hours */}
          <p><strong>Credits:</strong> {course?.credits}</p>
          
          {/* Course description */}
          <p><strong>Description:</strong> {course?.description}</p>
        </div>
      </div>
    </div>
  );
}

// Export CourseDetail component so it can be used in App.jsx
export default CourseDetail;