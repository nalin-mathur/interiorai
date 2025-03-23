import React, { useState } from 'react';
import './ImageUpload.css';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setImage(e.target.result);
        
        // Send image to backend
        setProcessing(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('http://localhost:8000/api/process-image', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          console.log('Backend response:', data);
        } catch (error) {
          console.error('Error sending image to backend:', error);
        } finally {
          setProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container">
      {!image ? (
        <div className="upload-button-container">
          <label htmlFor="image-upload" className="upload-button">
            Upload Image
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      ) : (
        <div className="image-container">
          <img src={image} alt="Uploaded" />
          <button 
            className="remove-button"
            onClick={() => setImage(null)}
          >
            Remove Image
          </button>
          {processing && <div className="processing-overlay">Processing...</div>}
        </div>
      )}
    </div>
  );
}

export default ImageUpload; 