import React,{ useState } from 'react';
import ClearDrawingCanvasButton from './ClearDrawingCanvasButton';
import './DrawingTools.scss';
import ColorPicker from './ColorPicker';
import { SketchPicker } from 'react-color';

function DrawingTools ( {onClearCanvas, currentColor, setCurrentColor, bgColor, setBgColor}) { // Add onColorChange as a prop
  
    const [paintMode, setPaintMode] = useState(true);
    const [eraseMode, setEraseMode] = useState(false);
    const [paletteMode, setPaletteMode] = useState(false);
    const [backgroundColorMode, setBackgroundColorMode] = useState(false);
    const [color, setColor] = useState('#00f000')
    
    
    const handleColorChange = (color) => {
        setCurrentColor(color.hexString);
        setColor(color.hexString);
        console.log("as");
    };
    const handleChangeComplete = (color) => {
      setColor(color.hex);
      setCurrentColor(color.hex);
      console.log("as");
    };
    const handleBgColorChangeComplete = (color) => {
      setBgColor(color.hex);
      console.log("handleBgColorChangeComplete");
    };


    const handleClearCanvas = () => {
        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');


        // Use the identity matrix while clearing the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.width-1;
        canvas.width = canvas.width+1;

        // Restore the transform
        //ctx.fillStyle = '#fff'; // Set background color
        //ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill entire canvas with background color
      };
  
    return (
    <div className="drawing-tools-container">
    {paletteMode && <SketchPicker
        color={ currentColor }
        onChangeComplete={ handleChangeComplete }
      />}
    {backgroundColorMode && <SketchPicker
        color={ bgColor }
        onChangeComplete={ handleBgColorChangeComplete }
      />}


    {/*paletteMode && <ColorPicker
          onColorChange={handleColorChange}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          color={currentColor}
          width={240}
          alpha={false}
        />*/}
      <button className="tools-button" onClick={() => { }}>
        Paint
      </button>
      <button className="tools-button" onClick={() => { handleClearCanvas() }}>
        Erase
      </button> 
      <button className="tools-button" onClick={() => { setPaletteMode(!paletteMode) }}>
        Palette
      </button> 
      <button className="tools-button" onClick={() => { setBackgroundColorMode(!backgroundColorMode) }}>
        Back Color
      </button>
      <button className="tools-button" onClick={() => { handleClearCanvas() }}>
        Clear Canvas
      </button>   
      {/* {<div style={{ marginTop: '20px', color: "white" }}>Selected Color: {color} {currentColor}</div>} */}
    </div>
  );
};

export default DrawingTools;
