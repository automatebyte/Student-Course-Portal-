// Import React hooks for managing component state and side effects
import { useState, useEffect } from 'react';

/**
 * Assignments Component - Displays all assignments in a card layout
 * 
 * This component:
 * 1. Fetches assignment data from our JSON server when it loads
 * 2. Shows a loading spinner while data is being fetched
 * 3. Displays assignments in responsive cards
 * 4. Shows assignment details like title, description, due date, and course
 * 5. Handles errors if data fetching fails
 * 
 * State variables explained:
 * - assignments: Array to store all assignment data from the server
 * - loading: Boolean to show/hide loading spinner
 * - error: String to store any error messages
 */
function Assignments() {
  // State to store the list of assignments from the server
  // Initially empty array [], will be filled when data loads
  const [assignments, setAssignments] = useState([]);
  
  // State to show loading spinner while fetching data
  // Initially true, becomes false when data loads or error occurs
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  // Initially null, gets error message if something goes wrong
  const [error, setError] = useState(null);

  // useEffect runs when component loads - fetches assignment data from server
  // The empty array [] means this only runs once when component first loads
  useEffect(() => {
    // Async function to get assignments from our JSON server
    // We use async/await to handle the API call properly
    const fetchAssignments = async () => {
      try {
        // Make API call to get all assignments from our local JSON server
        // This assumes json-server is running on port 3001
        const response = await fetch('http://localhost:3001/assignments');
        
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        
        // Convert response to JSON format
        const data = await response.json();
        
        // Update state with the fetched assignments
        setAssignments(data);
        
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
    fetchAssignments();
  }, []); // Empty dependency array means this only runs once

  // Show loading spinner while assignments are being fetched
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

  // Main assignments page layout - only shows if data loaded successfully
  return (
    <div className="container mt-4">
      {/* Page title */}
      <h2 className="mb-4">Assignments</h2>
      
      {/* Bootstrap grid to display assignments in cards */}
      <div className="row">
        {/* Loop through each assignment and create a card */}
        {/* map() creates a new component for each assignment in the array */}
        {assignments.map(assignment => (
          <div className="col-md-6 mb-4" key={assignment.id}>
            {/* Assignment card */}
            <div className="card">
              <div className="card-body">
                {/* Assignment title */}
                <h5 className="card-title">{assignment.title}</h5>
                
                {/* Assignment description */}
                <p className="card-text">{assignment.description}</p>
                
                {/* Due date information */}
                <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                
                {/* Course ID (could be enhanced to show course name) */}
                <p><strong>Course:</strong> {assignment.courseId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export Assignments component so it can be used in App.jsx
export default Assignments;