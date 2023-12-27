import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import Axios
import Header from './components/Generate/Header/Header';
import Tools from './components/Generate/LeftToolBar/Tools';
import PromptInput from './components/Generate/PromptInput/PromptInput';
import ImageContainer from './components/Generate/ImageContainer/ImageContainer';
import DrawingCanvas from  './components/Generate/LeftToolBar/ImageToImage/DrawingCanvas';
import LZString from 'lz-string';
import Canvas from  './components/Generate/LeftToolBar/ImageToImage/Canvas';
import { CanvasProvider } from './components/Generate/LeftToolBar/ImageToImage/CanvasContext'; // Import CanvasProvider

import ClearCanvasButton from './components/Generate/LeftToolBar/ImageToImage/ClearCanvasButton';
import './Style.scss';

function App() {
  const [prompt, setPrompt] = useState('');
  const [strengthValue, setStrengthValue] = useState(0.95);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [textToImage, setTextToImage] = useState(false);
  const [inpaint, setInpaint] = useState(false);
  const [error, setError] = useState('');
  const [currentColor, setCurrentColor] = useState('#000000'); // Add state for current color
  const [bgColor, setBgColor] = useState('#ffffff'); // Add this line
  
  const bgCanvasRef = useRef(null); // Define canvasRef
  const canvasRef = useRef(null); // Define canvasRef

  const handleColorChange = (color) => {
    setCurrentColor(color); // Update the current color
  };

  
  const generateImage = () => {
    const url = textToImage
      ? 'https://possible-imp-grossly.ngrok-free.app/generate_image_to_image'
      : 'https://possible-imp-grossly.ngrok-free.app/generate_image';
  
    setLoading(true);
  
    const requestData = {
      prompt: prompt,
      negative_prompt: negativePrompt,
      strength: textToImage ? strengthValue : undefined,
    };
  
    if (textToImage) {
      // Send image data when image to image is active
      /*requestData.image = LZString.compressToBase64(canvasRef.current.toDataURL());
      requestData.bg_image = LZString.compressToBase64(bgCanvasRef.current.toDataURL());*/
      requestData.image = canvasRef.current.toDataURL();
      requestData.bg_image = bgCanvasRef.current.toDataURL();
    }
  
    axios
      .post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      })
      .then(response => {
        const objectURL = URL.createObjectURL(response.data);
        setError('');
        setImageURL(objectURL);
      })
      .catch(err => {
        console.error('Error fetching image:', err);
        setError('Error loading image');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  





  return (
    <div className="app">
      <Header />
      <div className="container">
        <Tools 
          textToImage = {textToImage}
          setTextToImage = {setTextToImage}
          onColorChange = {handleColorChange}
          currentColor= {currentColor}
          setCurrentColor = {setCurrentColor} // Pass handleColorChange to Tools
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
        <div className="content">
          
          <PromptInput 
            prompt = {prompt} // Initial prompt text
            setPrompt={setPrompt} // Update state with new prompt
            strengthValue={strengthValue} // Initial slider value
            setStrengthValue={setStrengthValue} // Update state with new slider value
            onGenerateImage={generateImage} // Function to call for image generation
          />
          <div className="image-containers">
            {/*textToImage &&<CanvasProvider> {/* Wrap Canvas components with CanvasProvider }
          <Canvas />
          <ClearCanvasButton />
        </CanvasProvider>*/}

            {textToImage && (
            <DrawingCanvas
              currentColor={currentColor}
              bgColor={bgColor}
              
              canvasRef={canvasRef} // Pass canvasRef as a prop
              bgCanvasRef={bgCanvasRef}

            />
          )}
            <ImageContainer imageURL={imageURL} loading={loading} error={error} />
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default App;
