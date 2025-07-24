import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3001/courses/${id}`);
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