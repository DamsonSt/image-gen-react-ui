import React from 'react';
import './SquareImage.css';

const SquareImage = ({ imageURL, alt }) => {
  return (
    <div className="square-image-container">
      <img src={imageURL} alt={alt} className="square-image" />
    </div>
  );
};

export default SquareImage;
