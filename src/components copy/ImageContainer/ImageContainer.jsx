import React from 'react';
import './ImageContainer.scss';

function ImageContainer({ imageURL, loading, error }) {
  return (
    <div className="image-container">
      <div className="image-placeholder">
        {loading && <div className="spinner"></div>}
        {imageURL && <img src={imageURL} alt="Generated artwork based on user prompts" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ImageContainer;