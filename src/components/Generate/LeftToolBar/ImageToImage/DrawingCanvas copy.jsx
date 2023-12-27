import React, { useState, useRef, useEffect } from 'react';
import './DrawingCanvas.scss';
import ClearDrawingCanvasButton from './ClearDrawingCanvasButton';

const DrawingCanvas = ({ currentColor, canvasRef}) => { // Add currentColor as a prop
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
    
      // Create a temporary canvas and context
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
    
      // Set the temporary canvas to the current size and draw the current canvas onto it
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);
    
      // Resize the original canvas
      canvas.width = rect.width;
      canvas.height = rect.height;
    
      // Draw the temporary canvas onto the resized canvas, scaling it to fit
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);
    };

    handleResize();

    ctx.lineJoin = 'round';

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentColor]); // Add currentColor as a dependency to useEffect);

  const handleMouseDown = () => {
    setDrawing(true);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
  
    if (drawing) {
      ctx.lineTo(x, y);
      ctx.lineWidth = 10; // Set the desired line width
      ctx.strokeStyle = currentColor; // Set the desired stroke color
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else {
      ctx.moveTo(x, y);
    }
  };

  return (
    <div className="image-container">
      <div className="image-placeholder">
        <div className="drawing-container">
          <canvas
            ref={canvasRef}
            id="drawingCanvas"
            className="drawing-canvas"
            width="512"
            height="512"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
