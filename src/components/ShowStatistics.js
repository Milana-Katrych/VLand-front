import { useState, useEffect } from 'react';
import '../App.css';

function ShowStatistics() {
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/showStatistics');
        const data = await response.json();
        if (data.error) {
          setMessage(data.error);
        } else {
          setStats(data);
          if (data.message) setMessage(data.message);
        }
      } catch (error) {
        setMessage('');
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      {message && <p>{message}</p>}
      {stats ? (
        <div>
          <h3>Total tracks:</h3>
          <p>{stats.totalTracks || 'N/A'}</p>
          <h3>Total collection duration:</h3>
          <p>{stats.totalDuration || 'N/A'} seconds</p>
          <h3>Average song duration:</h3>
          <p>{' '}{stats.averageDuration ? stats.averageDuration.toFixed(2) : 'N/A'} seconds</p>
        </div>
      ) : (
        <p>No statistics</p>
      )}
    </div>
  );
}

export default ShowStatistics;