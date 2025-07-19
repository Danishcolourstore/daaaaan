
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS

const App = () => {
  const [backendMsg, setBackendMsg] = useState('');
  const [aiMsg, setAiMsg] = useState('');
  const [albums] = useState([
    { title: 'Anjali & Rahul', cover: '/albums/anjali.jpg', date: 'Mar 2025', id: 1 },
    { title: 'Sara & Faiz', cover: '/albums/sara.jpg', date: 'Feb 2025', id: 2 },
    { title: 'Nina & Aarav', cover: '/albums/nina.jpg', date: 'Jan 2025', id: 3 }
  ]);

  useEffect(() => {
    fetch('https://mirrorai-backend.up.railway.app/')
      .then(res => res.text())
      .then(setBackendMsg)
      .catch(() => setBackendMsg("⚠️ Failed to connect to Backend"));

    fetch('https://mirrorai-ai.up.railway.app/')
      .then(res => res.text())
      .then(setAiMsg)
      .catch(() => setAiMsg("⚠️ Failed to connect to AI Engine"));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter p-6">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-2">📸 Mirror AI</h1>
        <p className="text-lg text-gray-600">Your AI-powered photo delivery system</p>
      </header>

      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">✨ Featured Albums</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map(album => (
            <div key={album.id} className="bg-gray-50 rounded-xl shadow hover:shadow-lg overflow-hidden">
              <img src={album.cover} alt={album.title} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{album.title}</h3>
                <p className="text-sm text-gray-500">{album.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-xl mx-auto bg-gray-100 p-6 rounded-xl shadow text-left">
        <h2 className="text-2xl font-semibold mb-2">🛠 API Status</h2>
        <p className="text-sm"><strong>Backend:</strong> {backendMsg}</p>
        <p className="text-sm"><strong>AI Engine:</strong> {aiMsg}</p>
      </section>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
