import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Assignment() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [courses, setCourses] = useState([]);
  const [submission, setSubmission] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentRes, coursesRes] = await Promise.all([
          fetch(`http://localhost:3001/assignments/${id}`),
          fetch('http://localhost:3001/courses')
        ]);

        if (!assignmentRes.ok || !coursesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const assignmentData = await assignmentRes.json();
        const coursesData = await coursesRes.json();

        setAssignment(assignmentData);
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: id,
          studentId: 1,
          submissionText: submission,
          submissionDate: new Date().toISOString().split('T')[0],
          status: 'submitted'
        })
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      alert('Assignment submitted successfully!');
      setSubmission('');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

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
          <h2>{assignment?.title}</h2>
        </div>
        <div className="card-body">
          <p><strong>Course:</strong> {getCourseTitle(assignment?.courseId)}</p>
          <p><strong>Due Date:</strong> {assignment?.dueDate}</p>
          <p><strong>Max Score:</strong> {assignment?.maxScore}</p>
          <p><strong>Description:</strong> {assignment?.description}</p>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="submission" className="form-label">Your Submission</label>
              <textarea
                className="form-control"
                id="submission"
                rows="10"
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Assignment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Assignment;