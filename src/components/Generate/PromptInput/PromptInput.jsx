import React, { useState } from 'react';
import './PromptInput.scss';


function PromptInput ({prompt, setPrompt, strengthValue,setStrengthValue, onGenerateImage })  {

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSliderChange = (event) => {
    setStrengthValue(event.target.value);
  };

  const handleSubmit = (event) => {
    // Implement your logic to handle submitting the prompt and slider value
    event.preventDefault();
    console.log(`Prompt: ${prompt}, Slider Value: ${strengthValue}`);
  };

  return (
    
    <form className={"promptInput"} onSubmit={handleSubmit}>
     
      <input
        className={"textInput"}
        type="text"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={handlePromptChange}
      />
      <div className={"buttonsContainer"}>
        <button className={"seedButton"}>S</button>
        <button onClick={onGenerateImage} className={"generateButton"}>G</button>
      </div>
      <div className={"sliderContainer"}>
        <input
          className={"slider"}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={strengthValue}
          onChange={handleSliderChange}
        />
        <div style={{ marginLeft: '20px',minWidth: '40px', color: 'white' }}> {strengthValue}</div>

      </div>
    </form>
  );
};

export default PromptInput;