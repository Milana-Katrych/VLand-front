import { useState, useEffect } from 'react';
import '../App.css';

function SearchTrack() {
  const [searchType, setSearchType] = useState('name');
  const [form, setForm] = useState({ name: '', artist: '', minDuration: '', maxDuration: '' });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setForm({ name: '', artist: '', minDuration: '', maxDuration: '' });
    setResults([]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setResults([]);
    try {
      let url = 'http://localhost:8080/api/';
      if (searchType === 'name') {
        if (!form.name.trim()) {
          setMessage('Error: Track name cannot be empty');
          return;
        }
        url += `searchTrackByName?name=${encodeURIComponent(form.name)}`;
      } else if (searchType === 'artist') {
        if (!form.artist.trim()) {
          setMessage('Error: Artist name cannot be empty');
          return;
        }
        url += `searchTrackByArtist?artist=${encodeURIComponent(form.artist)}`;
      } else if (searchType === 'duration') {
        const min = parseInt(form.minDuration, 10);
        const max = parseInt(form.maxDuration, 10);
        if (isNaN(min) || isNaN(max) || form.minDuration === '' || form.maxDuration === '') {
          setMessage('Error: Enter valid numeric values for minimum and maximum duration');
          return;
        }
        if (min > max) {
          setMessage('Error: Minimum duration cannot be greater than maximum duration');
          return;
        }
        if (min < 0 || max < 0) {
          setMessage('Error: Duration cannot be negative');
          return;
        }
        url += `searchTrackByDuration?minDuration=${min}&maxDuration=${max}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        setMessage('Error: ' + data.error);
      } else {
        setMessage(data.message);
        setResults(Array.isArray(data.tracks) ? data.tracks : []);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Track</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Search by </label>
          <select
            value={searchType}
            onChange={handleSearchTypeChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="name">Track name</option>
            <option value="artist">Artist</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        {searchType === 'name' && (
          <div>
            <label className="block text-sm font-medium">Track Name </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        )}
        {searchType === 'artist' && (
          <div>
            <label className="block text-sm font-medium">Artist Name </label>
            <input
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        )}
        {searchType === 'duration' && (
          <>
            <div>
              <label className="block text-sm font-medium">Minimum Duration (seconds) </label>
              <input
                type="number"
                name="minDuration"
                value={form.minDuration}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Maximum Duration (seconds) </label>
              <input
                type="number"
                name="maxDuration"
                value={form.maxDuration}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                min="0"
                required
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      <p></p>
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
      {results.length > 0 && (
        <div className="mt-4">
          <h3>Results</h3>
          <ul className="mt-2 space-y-2">
            {results.map((track, index) => (
              <li key={index} className="p-2 bg-white rounded shadow">
                <h3>{track.name || 'Unknown Name'} by {track.artist || 'Unknown Artist'}</h3>
                <br />Year: {track.year || 'N/A'}
                <br />Duration: {track.duration || 0}s
                <br />Style: {track.style || 'N/A'}
                <br />Rating: {track.mark || 0}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchTrack;