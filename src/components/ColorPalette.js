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
    isColorRainbow,
    setIsColorRainbow,
    isNyanCat,
  } = props;

  const setColorValue = (newColorValue) => {
    let newColor = newColorValue;
    setCurrentColor(newColor);
    contextRef.current.strokeStyle = newColor;
    context2Ref.current.strokeStyle = newColor;

    contextRef.current.fillStyle = newColor;
    context2Ref.current.fillStyle = newColor;
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
      currentTool.current = "brushRainbow";
      return;
    }
    currentTool.current = "brush";
  };

  function isColorChangeNotAllowed() {
    return currentTool.current == "eraser" || currentTool.current == "brushRainbow";
  }

  function isColorRainbowChangeAllowed() {
    return (
      currentTool.current == "brush" ||
      (currentTool.current == "brushRainbow" && isNyanCat == false)
    );
  }

  return (
    <>
      <div
        className="container-color-tools"
        style={isNyanCat ? { opacity: "0", cursor: "default" } : {}}
      >
        
        <div className="container-color-with-text">
          <h5>Color</h5>
          <div className="container-current-color btn-color-tools">
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
        </div>

        <BtnsColorContainer
          handleColorPaletteChange={handleColorPaletteChange}
          isColorChangeNotAllowed={isColorChangeNotAllowed}
          isNyanCat={isNyanCat}
        />
        <div className="container-color-with-text">
          <h5 className={isColorRainbow ? "highlighted-text" : ""}>
            Rainbow Color
          </h5>
          <button
            disabled={!isColorRainbowChangeAllowed()}
            className={`btn btn-color-tools btn-color-rainbow ${
              isColorRainbow ? "btn-color-rainbow-active" : ""
            }`}
            style={isNyanCat ? { cursor: "default" } : {}}
            onClick={handleColorRainbowChange}
          ></button>
        </div>
      </div>
    </>
  );
}
