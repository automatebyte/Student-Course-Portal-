import { useState, useEffect } from 'react';

/**
 * Admin Component - Provides administrative interface for managing courses and assignments
 * Features: Add/delete courses, add/delete assignments, tabbed interface
 */
function Admin() {
  // Tab management state - controls which section is currently active
  const [activeTab, setActiveTab] = useState('courses');
  
  // Data states - store fetched courses and assignments from API
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  
  // UI states - handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for new course creation
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    instructor: '',
    credits: 3,
    schedule: '',
    description: ''
  });
  
  // Form state for new assignment creation
  const [newAssignment, setNewAssignment] = useState({
    courseId: '',
    title: '',
    description: '',
    dueDate: '',
    maxScore: 100
  });

  // Effect hook to fetch initial data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all courses from backend API
        const coursesResponse = await fetch('http://localhost:3001/courses');
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch all assignments from backend API
        const assignmentsResponse = await fetch('http://localhost:3001/assignments');
        if (!assignmentsResponse.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const assignmentsData = await assignmentsResponse.json();
        setAssignments(assignmentsData);

        // Data loaded successfully
        setLoading(false);
      } catch (err) {
        // Handle any errors during data fetching
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle new course form submission
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create new course
      const response = await fetch('http://localhost:3001/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      // Add new course to local state and reset form
      const addedCourse = await response.json();
      setCourses([...courses, addedCourse]);
      setNewCourse({
        code: '',
        title: '',
        instructor: '',
        credits: 3,
        schedule: '',
        description: ''
      });
      alert('Course added successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle new assignment form submission
  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create new assignment
      const response = await fetch('http://localhost:3001/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAssignment)
      });

      if (!response.ok) {
        throw new Error('Failed to add assignment');
      }

      // Add new assignment to local state and reset form
      const addedAssignment = await response.json();
      setAssignments([...assignments, addedAssignment]);
      setNewAssignment({
        courseId: '',
        title: '',
        description: '',
        dueDate: '',
        maxScore: 100
      });
      alert('Assignment added successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle course deletion with confirmation
  const deleteCourse = async (id) => {
    // Show confirmation dialog before deletion
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      // Send DELETE request to remove course
      const response = await fetch(`http://localhost:3001/courses/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Remove course from local state
      setCourses(courses.filter(course => course.id !== id));
      alert('Course deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle assignment deletion with confirmation
  const deleteAssignment = async (id) => {
    // Show confirmation dialog before deletion
    if (!window.confirm('Are you sure you want to delete this assignment?')) return;
    
    try {
      // Send DELETE request to remove assignment
      const response = await fetch(`http://localhost:3001/assignments/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete assignment');
      }

      // Remove assignment from local state
      setAssignments(assignments.filter(assignment => assignment.id !== id));
      alert('Assignment deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

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

  // Show error message if data fetching failed
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
      <h2 className="mb-4">Admin Panel</h2>
      
      {/* Tab navigation for switching between courses and assignments management */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Manage Courses
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            Manage Assignments
          </button>
        </li>
      </ul>

      {/* Courses Management Tab */}
      {activeTab === 'courses' && (
        <div>
          <div className="row">
            {/* Left column: Add new course form */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Add New Course</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCourseSubmit}>
                    {/* Course code input field */}
                    <div className="mb-3">
                      <label htmlFor="courseCode" className="form-label">Course Code</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="courseCode" 
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                        required
                      />
                    </div>
                    {/* Course title input field */}
                    <div className="mb-3">
                      <label htmlFor="courseTitle" className="form-label">Course Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="courseTitle" 
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        required
                      />
                    </div>
                    {/* Instructor selection dropdown */}
                    <div className="mb-3">
                      <label htmlFor="instructor" className="form-label">Instructor</label>
                      <select 
                        className="form-select" 
                        id="instructor"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                        required
                      >
                        <option value="">Select an instructor</option>
                        <option value="Dr. Abubakar Sheikh">Dr. Abubakar Sheikh</option>
                        <option value="Dr. Brian Kemeu">Dr. Brian Kemeu</option>
                        <option value="Prof. Emmanuel Kerich">Prof. Emmanuel Kerich</option>
                      </select>
                    </div>
                    {/* Credits and schedule input fields in a row */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="credits" className="form-label">Credits</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="credits" 
                          value={newCourse.credits}
                          onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value)})}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="schedule" className="form-label">Schedule</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="schedule" 
                          value={newCourse.schedule}
                          onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    {/* Course description textarea */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        id="description" 
                        rows="3"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Course</button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Right column: Display existing courses */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h4 className="mb-0">Existing Courses</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {/* Table displaying all courses with delete functionality */}
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Title</th>
                          <th>Instructor</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Map through courses array to display each course */}
                        {courses.map(course => (
                          <tr key={course.id}>
                            <td>{course.code}</td>
                            <td>{course.title}</td>
                            <td>{course.instructor}</td>
                            <td>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteCourse(course.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignments Management Tab */}
      {activeTab === 'assignments' && (
        <div>
          <div className="row">
            {/* Left column: Add new assignment form */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Add New Assignment</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleAssignmentSubmit}>
                    {/* Course selection dropdown - populated from existing courses */}
                    <div className="mb-3">
                      <label htmlFor="courseId" className="form-label">Course</label>
                      <select 
                        className="form-select" 
                        id="courseId"
                        value={newAssignment.courseId}
                        onChange={(e) => setNewAssignment({...newAssignment, courseId: e.target.value})}
                        required
                      >
                        <option value="">Select a course</option>
                        {courses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.code}: {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Assignment title input */}
                    <div className="mb-3">
                      <label htmlFor="assignmentTitle" className="form-label">Assignment Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="assignmentTitle" 
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                        required
                      />
                    </div>
                    {/* Due date picker */}
                    <div className="mb-3">
                      <label htmlFor="dueDate" className="form-label">Due Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        id="dueDate" 
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                        required
                      />
                    </div>
                    {/* Maximum score input */}
                    <div className="mb-3">
                      <label htmlFor="maxScore" className="form-label">Max Score</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="maxScore" 
                        value={newAssignment.maxScore}
                        onChange={(e) => setNewAssignment({...newAssignment, maxScore: parseInt(e.target.value)})}
                        required
                      />
                    </div>
                    {/* Assignment description textarea */}
                    <div className="mb-3">
                      <label htmlFor="assignmentDescription" className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        id="assignmentDescription" 
                        rows="3"
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Assignment</button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Right column: Display existing assignments */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h4 className="mb-0">Existing Assignments</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {/* Table displaying all assignments with delete functionality */}
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Course</th>
                          <th>Due Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Map through assignments array to display each assignment */}
                        {assignments.map(assignment => {
                          // Find the corresponding course for this assignment
                          const course = courses.find(c => c.id === assignment.courseId);
                          return (
                            <tr key={assignment.id}>
                              <td>{assignment.title}</td>
                              <td>{course ? course.code : 'Unknown'}</td>
                              <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => deleteAssignment(assignment.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;