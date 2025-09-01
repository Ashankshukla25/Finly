// client/src/components/UploadForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ user }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please choose a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        '/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-user-id': user.uid,
          }
        }
      );
      if (res.data.success) {
        setMessage('Uploaded & processed successfully!');
      }
    } catch (err) {
      setMessage('Upload failed.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Upload Receipt</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload & Analyze
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
