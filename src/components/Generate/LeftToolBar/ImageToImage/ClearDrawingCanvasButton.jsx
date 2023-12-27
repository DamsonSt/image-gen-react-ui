import React from 'react';
import PropTypes from 'prop-types';
import './ClearDrawingCanvasButton.scss';

const ClearDrawingCanvasButton = ({ onClearCanvas }) => {
  return (
    <button className="clear-button" onClick={onClearCanvas}>
      Clear Canvas
    </button>
  );
};

ClearDrawingCanvasButton.propTypes = {
  onClearCanvas: PropTypes.func.isRequired,
};

export default ClearDrawingCanvasButton;
