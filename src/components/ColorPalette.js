import React from "react";
import "../App.css";
import BtnsColorContainer from "./BtnsColorContainer";

export default function ColorPalette(props) {
  const {
    contextRef,
    context2Ref,
    currentColor,
    setCurrentColor,
    currentTool,
    setCurrentTool,
    isColorRainbow,
    setIsColorRainbow,
    isNyanCat,
  } = props;

  const setColorValue = (newColorValue) => {
    let newColor = newColorValue;
    setCurrentColor(newColor);
    contextRef.current.strokeStyle = newColor;
    context2Ref.current.strokeStyle = newColor;
  };

  const handleColorPickerChange = (e) => {
    setColorValue(e.currentTarget.value);
  };

  const handleColorPaletteChange = (newColorValue) => {
    setColorValue(newColorValue);
  };

  const handleColorRainbowChange = () => {
    setIsColorRainbow(!isColorRainbow);
    if (!isColorRainbow) {
      setCurrentTool("brushRainbow");
      return;
    }
    setCurrentTool("brush");
  };

  function isColorChangeNotAllowed() {
    return currentTool == "eraser" || currentTool == "brushRainbow";
  }

  function isColorRainbowChangeAllowed() {
    return (
      currentTool == "brush" ||
      (currentTool == "brushRainbow" && isNyanCat == false)
    );
  }

  return (
    <>
      <div
        className="container-color-tools"
        style={isNyanCat ? { opacity: "0", cursor: "default" } : {}}
      >
        <div className="container-current-color btn-color-tools tools-section">
          <div
            className="current-color"
            style={
              !isColorChangeNotAllowed()
                ? { background: currentColor }
                : {
                    background: currentColor,
                    opacity: 0.6,
                  }
            }
          ></div>
          <input
            disabled={isColorChangeNotAllowed()}
            id="input-color-picker"
            type="color"
            value="#000000"
            className="color-picker"
            style={isColorChangeNotAllowed() ? { opacity: 0 } : {}}
            onChange={handleColorPickerChange}
          ></input>
        </div>
        <BtnsColorContainer
          handleColorPaletteChange={handleColorPaletteChange}
          isColorChangeNotAllowed={isColorChangeNotAllowed}
          isNyanCat={isNyanCat}
        />
        <button
          disabled={!isColorRainbowChangeAllowed()}
          className={`btn btn-color-tools btn-color-rainbow tools-section ${
            isColorRainbow ? "btn-color-rainbow-active" : ""
          }`}
          style={isNyanCat ? { cursor: "default" } : {}}
          onClick={handleColorRainbowChange}
        ></button>
      </div>
    </>
  );
}
