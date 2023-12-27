import React, { useState } from 'react';
import './Styles.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const generateImage = () => {
    // Construct the URL for the Flask server
    const url = `https://possible-imp-grossly.ngrok-free.app/generate_image?prompt=${encodeURIComponent(
      prompt
    )}&negative_prompt=${encodeURIComponent(negativePrompt)}`;

    // Display loading spinner
    setLoading(true);

    // Fetch the image from the Flask server
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create an object URL for the blob
        const objectURL = URL.createObjectURL(blob);

        // Set the image and hide the loading spinner
        setImage(objectURL);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
        // Set the error and hide the loading spinner
        setError('Error loading image');
        setLoading(false);
        setImage(null);
      });
  };

  return (
    <div className="container">
      <h1>Image Generator</h1>
      <label htmlFor="prompt">Prompt:</label>
      <input
        type="text"
        id="prompt"
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <label htmlFor="negativePrompt">Negative Prompt:</label>
      <input
        type="text"
        id="negativePrompt"
        placeholder="Enter negative prompt..."
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
      />
      <button onClick={generateImage}>Generate Image</button>
      <div id="imageContainer">
        {loading && <div className="spinner"></div>}
        {image && <img src={image} alt="Generated Image" />}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default App;
