/**
 * COURSE COMPONENT - Student Course Portal
 * 
 * This component displays all available courses in a beautiful card layout.
 * Students can view course information and navigate to detailed course pages.
 * 
 * Key Features:
 * - Fetches course data from JSON server
 * - Displays courses in responsive grid layout
 * - Shows loading spinner while data loads
 * - Handles errors gracefully
 * - Links to individual course detail pages
 */

// Import React hooks for managing component state and lifecycle
import { useState, useEffect } from 'react';
// Import Link component for navigation between pages without page refresh
import { Link } from 'react-router-dom';

/**
 * Courses Component
 * 
 * This is the main component that displays all available courses.
 * It fetches data from our backend server and shows it in a user-friendly format.
 */
function Courses() {
  // STATE MANAGEMENT
  // useState hooks help us store and update data in our component
  
  // Store the list of courses fetched from the server
  const [courses, setCourses] = useState([]);
  
  // Track if we're still loading data (shows spinner)
  const [loading, setLoading] = useState(true);
  
  // Store any error messages if something goes wrong
  const [error, setError] = useState(null);

  /**
   * DATA FETCHING
   * 
   * useEffect runs when the component first loads (mounts)
   * This is where we fetch our course data from the server
   */
  useEffect(() => {
    /**
     * Async function to fetch courses from our JSON server
     * 
     * Why async? Because fetching data takes time and we don't want
     * to freeze the user interface while waiting for the response
     */
    const fetchCourses = async () => {
      try {
        // Step 1: Make a request to our local JSON server
        // This simulates a real database/API call
        const response = await fetch('http://localhost:3001/courses');
        
        // Step 2: Check if the request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        // Step 3: Convert the response to JSON format
        let data = await response.json();

        /**
         * INSTRUCTOR NAME CUSTOMIZATION
         * 
         * Here we update specific course instructors for our demo.
         * In a real app, this data would come directly from the database.
         */
        data = data.map(course => {
          // Update instructor for Computer Science course
          if (course.id === "1") {
            return { ...course, instructor: "Dr. Abubakar Sheikh" };
          } 
          // Update instructor for Data Structures course
          else if (course.id === "2") {
            return { ...course, instructor: "Dr. Brian Kemeu" };
          } 
          // Update instructor for Calculus course
          else if (course.id === "3") {
            return { ...course, instructor: "Prof. Emmanuel Kerich" };
          }
          // Keep other courses unchanged
          return course;
        });

        // Step 4: Update our component state with the fetched data
        setCourses(data);        // Store the courses
        setLoading(false);       // Hide loading spinner
        
      } catch (err) {
        // If anything goes wrong, store the error message and stop loading
        setError(err.message);
        setLoading(false);
      }
    };

    // Actually call the function to fetch data
    fetchCourses();
    
  }, []); // Empty dependency array means this runs only once when component loads

  /**
   * LOADING STATE
   * 
   * While we're fetching data, show a nice loading spinner
   * This gives users feedback that something is happening
   */
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        {/* Bootstrap spinner component */}
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  /**
   * ERROR STATE
   * 
   * If something went wrong, show a user-friendly error message
   * This is better than showing a blank page or crashing
   */
  if (error) {
    return (
      <div className="container mt-4">
        {/* Bootstrap alert component for errors */}
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  /**
   * MAIN COMPONENT RENDER
   * 
   * This is what users see when everything loads successfully.
   * We display courses in a responsive grid layout using Bootstrap.
   */
  return (
    <div className="container mt-4">
      {/* Page title */}
      <h2 className="mb-4">My Courses</h2>

      {/* Bootstrap responsive grid system */}
      <div className="row">
        {/* 
          COURSE CARDS
          
          We use the map() function to create a card for each course.
          This is a common React pattern for displaying lists of data.
        */}
        {courses.map(course => (
          // Each card takes different widths on different screen sizes
          // col-md-6 = 2 cards per row on medium screens
          // col-lg-4 = 3 cards per row on large screens
          <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
            
            {/* Course card with equal height (h-100) */}
            <div className="card h-100">
              
              {/* Card header with course code and title */}
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">
                  {course.code}: {course.title}
                </h5>
              </div>
              
              {/* Card body with course information */}
              <div className="card-body">
                {/* Course instructor */}
                <p><strong>Instructor:</strong> {course.instructor}</p>
                
                {/* Class schedule */}
                <p><strong>Schedule:</strong> {course.schedule}</p>
                
                {/* Credit hours */}
                <p><strong>Credits:</strong> {course.credits}</p>
                
                {/* Course description */}
                <p className="card-text">{course.description}</p>
                
                {/* 
                  Navigation link to course details page
                  Uses React Router's Link component for smooth navigation
                */}
                <Link 
                  to={`/courses/${course.id}`} 
                  className="btn btn-primary"
                >
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

/**
 * EXPORT COMPONENT
 * 
 * This makes the Courses component available for use in other files.
 * The App.jsx file imports this component to display it in the application.
 */
