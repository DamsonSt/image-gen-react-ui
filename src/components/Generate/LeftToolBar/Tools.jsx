import React, { useState } from 'react';
import { CanvasProvider } from './ImageToImage/CanvasContext'; // Import CanvasProvider
import ClearCanvasButton from './ImageToImage/ClearCanvasButton';
import Canvas from './ImageToImage/Canvas';
import DrawingTools from './ImageToImage/DrawingTools'; // Import DrawingTools
import './Tools.scss';

const ToolButton = ({ text, active, onClick }) => (
  <button className={active ? "activeButton" : "button"} onClick={onClick}>
    {text}
  </button>
);

const BlankButton = () => <div className={"blankButton"}></div>;

const Tools = ({ textToImage, setTextToImage,currentColor, setCurrentColor, bgColor, setBgColor}) => {
  const [selectedTool, setSelectedTool] = useState('TextToImg');
  const [showImgToImgButton, setShowImgToImgButton] = useState(false);

  const handleColorChange = (color) => {
    setCurrentColor(color); // Update the current color
  };
  

  const handleClick = (tool) => {
    setSelectedTool(tool);

    setTextToImage(tool === 'ImgToImg');

    setShowImgToImgButton(tool === 'ImgToImg');
  };

  

  return (
    <div className={"tools"}>
      <div className={"toolButtons"}>
        <ToolButton
          text="TextToImg"
          active={selectedTool === 'TextToImg'}
          onClick={() => handleClick('TextToImg')}
        />
        <ToolButton
          text="ImgToImg"
          active={selectedTool === 'ImgToImg'}
          onClick={() => handleClick('ImgToImg')}
        />
        
        {textToImage && 
          <DrawingTools 
            
            currentColor= {currentColor}
            setCurrentColor = {setCurrentColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            />}
        
      </div>
      {/* <div style={{ marginTop: '20px' }}>Selected Color: {currentColor}</div> {showImgToImgButton && <BlankButton />} */}
      {/* Add your other tool components here ... */}
    </div>
  );
};

export default Tools;
