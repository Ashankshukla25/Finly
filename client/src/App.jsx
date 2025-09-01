// client/src/App.jsx
import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) return alert("Please upload a file");
    // Send file to backend using fetch or axios
    console.log("Sending file to backend:", file);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Invoice & Expense Auto-Categorizer</h1>

      <div style={{ margin: '30px auto', width: '300px' }}>
        <input type="file" onChange={handleFileChange} />
        <br /><br />
        <button onClick={handleSubmit}>Upload & Analyze</button>
      </div>
    </div>
  );
}

export default App;

