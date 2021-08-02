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
    if (isColorRainbow == false) {
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
      <div className="container-palette-box">
        <div className="container-palette-background"></div>
        <div className="container-palette-main">
          <div className="current-color-box">
            <div
              className="current-color"
              style={
                !isColorChangeNotAllowed()
                  ? { background: currentColor }
                  : { background: currentColor, opacity: 0.5 }
              }
            ></div>
            <input
              disabled={isColorChangeNotAllowed()}
              id="color-picker"
              type="color"
              value={currentColor}
              className="color-picker"
              style={
                isColorChangeNotAllowed()
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
              onChange={handleColorPickerChange}
            ></input>
          </div>
          <BtnsColorContainer
            handleColorPaletteChange={handleColorPaletteChange}
            isColorChangeNotAllowed={isColorChangeNotAllowed}
          />
          <button
            disabled={!isColorRainbowChangeAllowed()}
            className={`btn-color-rainbow ${
              isColorRainbow ? "btn-color-rainbow-active" : ""
            }`}
            onClick={handleColorRainbowChange}
          ></button>
        </div>
      </div>
    </>
  );
}
