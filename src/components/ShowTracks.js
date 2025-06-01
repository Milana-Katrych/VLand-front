import { useState, useEffect } from 'react';
import '../App.css';

function ShowTracks() {
    const [tracks, setTracks] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/showTracks', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                if (data.error) {
                    setMessage(data.error);
                    setTracks([]);
                } else {
                    if (Array.isArray(data.tracks)) {
                        setTracks(data.tracks);
                    } else {
                        setTracks([]);
                        setMessage('No tracks found or invalid data format');
                    }
                }
            } catch (error) {
                console.log('Fetch error:', error);
                setMessage('Error fetching tracks: ' + error.message);
                setTracks([]);
            }
        };
        fetchTracks();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Show Tracks</h2>
            {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
            {Array.isArray(tracks) && tracks.length > 0 && (
                <ul className="mt-2 space-y-2">
                    {tracks.map((track, index) => (
                        <li key={index} className="p-2 bg-white rounded shadow">
                            <h3>{track.name || 'Unknown Name'} by {track.artist || 'Unknown Artist'}</h3>
                            <br />Year: {track.year || 'N/A'}
                            <br />Duration: {(track.duration || 0) + 's'}
                            <br />Style: {track.style || 'N/A'}
                            <br />Rating: {track.mark || 'N/A'}
                        </li>
                    ))}
                </ul>
            )}
            {Array.isArray(tracks) && tracks.length === 0 && !message && (
                <p className="mt-2 text-sm text-gray-600">No tracks available</p>
            )}
        </div>
    );
}

export default ShowTracks;