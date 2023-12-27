import React, { useContext, useRef, useState } from "react";
import './Canvas.scss';

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    // canvas.width = window.innerWidth * 2;
    // canvas.height = window.innerHeight * 2;
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    const context = canvas.getContext("2d")
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 10;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="canvas-container">
      <div className="canvas">
        <CanvasContext.Provider
          value={{
            canvasRef,
            contextRef,
            prepareCanvas,
            startDrawing,
            finishDrawing,
            clearCanvas,
            draw,
          }}
        >
          {children}
        </CanvasContext.Provider>
      </div>
    </div>
  );
};

export const useCanvas = () => useContext(CanvasContext);
