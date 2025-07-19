
import React from 'react';
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen p-4 sm:p-10 bg-white">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">📷 Album #{id}</h1>
      <p className="text-gray-600 mb-10">Album preview will be dynamically shown here based on image upload.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">Image 1</div>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">Image 2</div>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">Image 3</div>
      </div>
    </div>
  );
};

export default AlbumPage;
