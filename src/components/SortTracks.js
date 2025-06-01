import { useState } from 'react';
import '../App.css';

function SortTracks() {
  const [sortType, setSortType] = useState('duration');
  const [order, setOrder] = useState('asc');
  const [tracks, setTracks] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setTracks([]);
    try {
      const response = await fetch(`http://localhost:8080/api/sortTracks?type=${sortType}&order=${order}`);
      const data = await response.json();
      if (data.error) {
        setMessage('Error: ' + data.error);
      } else if (data.tracks.length === 0) {
        setMessage('No tracks found for sorting');
      } else {
        setTracks(data.tracks);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sort Tracks</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Sort by </label>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="duration">Duration</option>
            <option value="mark">Rating</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Order </label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="asc">{sortType === 'duration' ? 'Shortest First' : 'Lowest First'}</option>
            <option value="desc">{sortType === 'duration' ? 'Longest First' : 'Highest First'}</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
      {tracks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Sorted Tracks</h3>
          <ul className="mt-2 space-y-2">
            {tracks.map((track, index) => (
              <li key={index} className="p-2 bg-white rounded shadow">
                <h3>{track.name} by {track.artist}</h3>
                <br />Year: {track.year}
                <br />Duration: {track.duration}s
                <br />Style: {track.style}
                <br />Rating: {track.mark}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortTracks;