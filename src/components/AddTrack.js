import { useState } from 'react';
import '../App.css';

function AddTrack() {
  const [form, setForm] = useState({
    name: '', artist: '', year: '', duration: '', style: '', mark: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:8080/api/addTrack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          artist: form.artist,
          year: parseInt(form.year),
          duration: parseInt(form.duration),
          style: form.style,
          mark: parseInt(form.mark),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setForm({ name: '', artist: '', year: '', duration: '', style: '', mark: '' });
      } else {
        setMessage('Error: ' + (data.error || 'Unknown Error'));
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add track</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Track name </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Artist </label>
          <input
            type="text"
            name="artist"
            value={form.artist}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Year </label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (seconds) </label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Style </label>
          <input
            type="text"
            name="style"
            value={form.style}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating </label>
          <input
            type="number"
            name="mark"
            value={form.mark}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add track
        </button>
        {message && (
          <p className={`mt-2 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddTrack;