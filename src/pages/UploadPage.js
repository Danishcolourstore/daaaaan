
import React, { useState } from 'react';

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [albumId, setAlbumId] = useState('1'); // Default to Album 1

  const albums = [
    { id: '1', name: 'Anjali & Rahul' },
    { id: '2', name: 'Sara & Faiz' },
    { id: '3', name: 'Nina & Aarav' }
  ];

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('photos', file));
    formData.append('albumId', albumId);

    setUploadStatus('⏳ Uploading and processing...');

    try {
      const res = await fetch('https://mirrorai-backend.up.railway.app/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploadStatus('✅ Uploaded and processing started!');
        setSelectedFiles([]);
      } else {
        setUploadStatus('❌ Upload failed.');
      }
    } catch (error) {
      setUploadStatus('❌ Error during upload.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-10">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">📤 Upload Photos</h1>
      <p className="text-gray-600 mb-6">Select images and link them to an album. AI retouching will run automatically.</p>

      <label className="block mb-2 font-medium">Choose Album:</label>
      <select
        className="mb-4 border p-2 rounded"
        value={albumId}
        onChange={(e) => setAlbumId(e.target.value)}
      >
        {albums.map((album) => (
          <option key={album.id} value={album.id}>
            {album.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/jpeg, image/png"
        multiple
        onChange={handleFileChange}
        className="block mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Upload to Album
      </button>

      <p className="mt-4 text-sm text-green-700">{uploadStatus}</p>

      {selectedFiles.length > 0 && (
        <ul className="mt-6 text-sm text-gray-800">
          {selectedFiles.map((file, index) => (
            <li key={index}>📷 {file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadPage;
