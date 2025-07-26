// Import React hooks for managing component state and side effects
import { useState, useEffect } from 'react';
// Import Link for navigation between pages
import { Link } from 'react-router-dom';

// Dashboard component - shows student's main overview page
function Dashboard() {
  // State variables to store different types of data
  const [studentData, setStudentData] = useState(null);  // Student's personal info
  const [courses, setCourses] = useState([]);            // List of enrolled courses
  const [assignments, setAssignments] = useState([]);    // List of assignments
  const [stats, setStats] = useState(null);             // Calculated statistics
  const [loading, setLoading] = useState(true);         // Shows loading spinner
  const [error, setError] = useState(null);             // Stores any error messages
  
  // useEffect runs when the component loads - fetches all data from the server
  useEffect(() => {
    // Async function to fetch data from our mock JSON server
    const fetchData = async () => {
      try {
        // Get student's personal information (ID = 1 for demo)
        const studentResponse = await fetch("https://student-course-api.onrender.com/students")
);
        if (!studentResponse.ok) {
          throw new Error('Failed to fetch student data');
        }
        const studentData = await studentResponse.json();
        setStudentData(studentData);
        
        // Get all available courses
        const coursesResponse = await fetch('http://localhost:3001/courses'');
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);
        
        // Get all assignments
        const assignmentsResponse = await fetch('http://localhost:3001/assignments');
        if (!assignmentsResponse.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const assignmentsData = await assignmentsResponse.json();
        setAssignments(assignmentsData);
        
        // Calculate dashboard statistics
        const today = new Date();
        // Filter assignments to find only upcoming ones
        const upcomingAssignments = assignmentsData.filter(assignment => {
          const dueDate = new Date(assignment.dueDate);
          return dueDate >= today; // Only assignments due today or later
        });
        
        // Set calculated statistics for dashboard cards
        setStats({
          coursesEnrolled: coursesData.length,
          assignmentsPending: upcomingAssignments.length,
          upcomingDeadlines: upcomingAssignments.length,
          attendanceRate: 0 // Hardcoded for demo purposes
        });
        
        setLoading(false); // Hide loading spinner
      } catch (err) {
        setError(err.message); // Store error message
        setLoading(false);     // Hide loading spinner
      }
    };
    
    fetchData(); // Call the function when component mounts
  }, []); // Empty array means this only runs once when component loads

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

  // Main dashboard layout
  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-primary animate-fade-in">Student Dashboard</h2>
      
      <div className="row mt-4">
        {/* Left column - Student Profile Card */}
        <div className="col-md-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="card">
            <div className="card-body">
              {/* Profile header with icon */}
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary text-white p-3 me-3">
                  <i className="bi bi-person-circle fs-4"></i>
                </div>
                <h5 className="card-title mb-0">Student Profile</h5>
              </div>
              {/* Display student information if data is loaded */}
              {studentData && (
                <>
                  <p><strong>Name:</strong> {studentData.name}</p>
                  <p><strong>ID:</strong> {studentData.studentId}</p>
                  <p><strong>Program:</strong> {studentData.program}</p>
                  <p><strong>Year:</strong> {studentData.year}</p>
                  <p><strong>GPA:</strong> <span className="badge bg-primary">{studentData.gpa}</span></p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Statistics Cards */}
        <div className="col-md-8">
          <div className="row">
            {/* Courses Enrolled Card */}
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Courses Enrolled</h5>
                    <i className="bi bi-book fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.coursesEnrolled || 0}</h2>
                  <Link to="/courses" className="btn btn-sm btn-light mt-2">View Courses</Link>
                </div>
              </div>
            </div>
            
            {/* Pending Assignments Card */}
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="card bg-warning text-dark">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Pending Assignments</h5>
                    <i className="bi bi-clipboard-check fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.assignmentsPending || 0}</h2>
                  <Link to="/assignments" className="btn btn-sm btn-dark mt-2">View Assignments</Link>
                </div>
              </div>
            </div>
            
            {/* Attendance Rate Card */}
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Attendance Rate</h5>
                    <i className="bi bi-calendar-check fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.attendanceRate || 0}%</h2>
                </div>
              </div>
            </div>
            
            {/* Upcoming Deadlines Card */}
            <div className="col-md-6 mb-3 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Upcoming Deadlines</h5>
                    <i className="bi bi-alarm fs-1 opacity-50"></i>
                  </div>
                  <h2>{stats?.upcomingDeadlines || 0}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Courses Table Section */}
      <div className="row mt-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Recent Courses</h5>
            </div>
            <div className="card-body">
              {/* Responsive table wrapper */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Instructor</th>
                      <th>Schedule</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Show only first 3 courses for dashboard preview */}
                    {courses.slice(0, 3).map(course => {
                      // Fix instructor names for demo data
                      let instructor = course.instructor;
                      if (course.id === "1") instructor = "Dr. Smith";
                      if (course.id === "2") instructor = "Prof. Johnson";
                      if (course.id === "3") instructor = "Dr. Williams";
                      
                      return (
                        <tr key={course.id}>
                          <td><span className="badge bg-secondary">{course.code}</span></td>
                          <td>{course.title}</td>
                          <td>{instructor}</td>
                          <td>{course.schedule}</td>
                          <td>
                            <Link to={`/courses/${course.id}`} className="btn btn-sm btn-outline-primary">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Show link to view all courses if there are more than 3 */}
              {courses.length > 3 && (
                <div className="text-center mt-3">
                  <Link to="/courses" className="btn btn-primary">
                    View All Courses ({courses.length})
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
