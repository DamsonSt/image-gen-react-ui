import React from 'react';
import './Tools.scss';
import ClearCanvasButton from '../Canvas/ClearCanvasButton';

function PromptInput({ label, placeholder, value, onChange }) {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}:</label>
      <input
        type="text"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function NegativePromptInput({ label, placeholder, value, onChange }) {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}:</label>
      <input
        type="text"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function InpaintCheckbox({ label, onChange }) {
  const handleCheckboxChange = () => {
    if (typeof onChange === 'function') {
      onChange((prevValue) => !prevValue);
    }
  };

  return (
    <div className="input-container">
      <label htmlFor={label}>{label}:</label>
      <input
        type="checkbox"
        id={label}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}



function Tools({ prompt, setPrompt, negativePrompt, setNegativePrompt,inpaint, setInpaint, onGenerateImage }) {
  
  return (
    <div className="tools-container">
      <PromptInput
        label="Prompt"
        placeholder="Enter prompt..."
        value={prompt}
        onChange={setPrompt}
      />
      <NegativePromptInput
        label="NegativePrompt"
        placeholder="Enter negative prompt..."
        value={negativePrompt}
        onChange={setNegativePrompt}
      />
      <InpaintCheckbox
        label="Inpaint"
        isChecked={inpaint}
        onChange={setInpaint}
      />
      {/* {inpaint && (
      <ClearCanvasButton
      /> 
      )} */}

      <button onClick={onGenerateImage}>Generate Image</button>

    </div>
  );
}

export default Tools;
