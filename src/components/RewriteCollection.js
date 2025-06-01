import { useState } from 'react';
import '../App.css';

function RewriteCollection() {
  const [message, setMessage] = useState('');

  const handleRewrite = async () => {
    setMessage('');
    try {
      const response = await fetch('http://localhost:8080/api/rewriteCollection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(data.message || '');
      }
    } catch (error) {
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rewrite Collection</h2>
      <button
        onClick={handleRewrite}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Rewrite Collection
      </button>
      {message && (
        <p className={`mt-2 text-sm ${message.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default RewriteCollection;