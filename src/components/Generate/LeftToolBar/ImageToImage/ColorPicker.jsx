import React, { useEffect, useRef } from 'react';
import iro from '@jaames/iro';
import PropTypes from 'prop-types';
import './ColorPicker.scss';

const ColorPicker = ({ onColorChange,currentColor, setCurrentColor, color, width, alpha }) => {
  const colorPickerElement = useRef(null);
  const colorPickerInstance = useRef(null);

  useEffect(() => {
    if (!colorPickerInstance.current) {
      // Initialize color picker only once
      colorPickerInstance.current = new iro.ColorPicker(colorPickerElement.current, {
        width: width,
        color: color,
        layout: [
          { component: iro.ui.Box },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'hue',
            },
          },
          alpha
            ? {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'alpha',
                },
              }
            : null,
        ].filter(Boolean),
      });
  
      const handleColorChange = (newColor) => {
        onColorChange(newColor.hexString);
        console.log("Change color1", {newColor});
      };
  
      colorPickerInstance.current.on('color:change', handleColorChange);
    } else {
      // Only update color if it has changed
      setCurrentColor(color);
      console.log("Change color2", {color});
      colorPickerInstance.current.color.set(color);
      
    }
  
    return () => {
      if (colorPickerInstance.current) {
        colorPickerInstance.current.off('color:change');
      }
    };
  }, [onColorChange, color, width, alpha]);

  const safelyCallDestroy = (picker) => {
    if (picker && typeof picker.destroy === 'function') {
      picker.destroy();
    }
  };

  return <div ref={colorPickerElement} />;
};

ColorPicker.propTypes = {
  onColorChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number,
  alpha: PropTypes.bool,
};

ColorPicker.defaultProps = {
  width: 240,
  alpha: false,
};

export default ColorPicker;
