import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://localhost:3001/assignments');
        if (!response.ok) throw new Error('Failed to fetch assignments');
        const data = await response.json();
        setAssignments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) return <div className="container mt-4 text-center"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Assignments</h2>
      <div className="row">
        {assignments.map(assignment => (
          <div className="col-md-6 mb-4" key={assignment.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{assignment.title}</h5>
                <p className="card-text">{assignment.description}</p>
                <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                <p><strong>Course:</strong> {assignment.courseId}</p>
                <Link to={`/assignments/${assignment.id}`} className="btn btn-primary">View Assignment</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assignments;
