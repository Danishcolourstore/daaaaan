
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function GuestGallery() {
  const router = useRouter();
  const { id } = router.query;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/guest/${id}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.images || []);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Guest 🎉</h1>
      {loading && <p>Loading your photos...</p>}
      {!loading && images.length === 0 && <p>No images found for your face ID.</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <img key={i} src={img} alt="Guest" className="rounded-lg shadow" />
        ))}
      </div>
    </div>
  );
}
