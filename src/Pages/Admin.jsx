import { useState, useEffect } from 'react';

function Admin() {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    instructor: '',
    credits: 3,
    schedule: '',
    description: ''
  });

  const [newAssignment, setNewAssignment] = useState({
    courseId: '',
    title: '',
    description: '',
    dueDate: '',
    maxScore: 100
  });

  useEffect(() => {
    // Fetch courses and assignments
    const fetchData = async () => {
      try {
        const coursesResponse = await fetch("https://student-course-api-3.onrender.com/courses");
        if (!coursesResponse.ok) throw new Error('Failed to fetch courses');
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        const assignmentsResponse = await fetch("https://student-course-api-3.onrender.com/assignments");
        if (!assignmentsResponse.ok) throw new Error('Failed to fetch assignments');
        const assignmentsData = await assignmentsResponse.json();
        setAssignments(assignmentsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle course submission
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://student-course-api-3.onrender.com/courses", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse)
      });

      if (!response.ok) throw new Error('Failed to add course');

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

  // Handle assignment submission
  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://student-course-api-3.onrender.com/assignments", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssignment)
      });

      if (!response.ok) throw new Error('Failed to add assignment');

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

  // Delete course by ID
  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`https://student-course-api-3.onrender.com/courses/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete course');

      setCourses(courses.filter(course => course.id !== id));
      alert('Course deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Delete assignment by ID
  const deleteAssignment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) return;

    try {
      const response = await fetch(`https://student-course-api-3.onrender.com/assignments/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete assignment');

      setAssignments(assignments.filter(assignment => assignment.id !== id));
      alert('Assignment deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
            Manage Courses
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>
            Manage Assignments
          </button>
        </li>
      </ul>

      {/* Course Management */}
      {activeTab === 'courses' && (
        <div>
          <h4>Add New Course</h4>
          <form onSubmit={handleCourseSubmit} className="mb-4">
            {/* course form fields */}
            <input type="text" className="form-control mb-2" placeholder="Code" value={newCourse.code} onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })} />
            <input type="text" className="form-control mb-2" placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
            <input type="text" className="form-control mb-2" placeholder="Instructor" value={newCourse.instructor} onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })} />
            <input type="number" className="form-control mb-2" placeholder="Credits" value={newCourse.credits} onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })} />
            <input type="text" className="form-control mb-2" placeholder="Schedule" value={newCourse.schedule} onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })} />
            <textarea className="form-control mb-2" placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}></textarea>
            <button type="submit" className="btn btn-success">Add Course</button>
          </form>

          <h4>Existing Courses</h4>
          <ul className="list-group">
            {courses.map(course => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={course.id}>
                {course.title}
                <button className="btn btn-sm btn-danger" onClick={() => deleteCourse(course.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assignment Management */}
      {activeTab === 'assignments' && (
        <div>
          <h4>Add New Assignment</h4>
          <form onSubmit={handleAssignmentSubmit} className="mb-4">
            {/* assignment form fields */}
            <input type="text" className="form-control mb-2" placeholder="Course ID" value={newAssignment.courseId} onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })} />
            <input type="text" className="form-control mb-2" placeholder="Title" value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} />
            <textarea className="form-control mb-2" placeholder="Description" value={newAssignment.description} onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}></textarea>
            <input type="date" className="form-control mb-2" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })} />
            <input type="number" className="form-control mb-2" placeholder="Max Score" value={newAssignment.maxScore} onChange={(e) => setNewAssignment({ ...newAssignment, maxScore: Number(e.target.value) })} />
            <button type="submit" className="btn btn-success">Add Assignment</button>
          </form>

          <h4>Existing Assignments</h4>
          <ul className="list-group">
            {assignments.map(assignment => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={assignment.id}>
                {assignment.title}
                <button className="btn btn-sm btn-danger" onClick={() => deleteAssignment(assignment.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admin;
