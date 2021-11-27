import React, { useEffect, useState } from "react";
import "../App.css";
import LogoNyanCat from "./LogoNyanCat";

export default function ToolsContainer(props) {
  const {
    contextRef,
    context2Ref,
    currentColor,
    width,
    setWidth,
    setCurrentTool,
    handleCursorChange,
    setEraserColor,
    isStroke,
    setIsStroke,
    isColorRainbow,
    isNyanCat,
    setIsNyanCat,
    setNyanCatValues,
  } = props;

  const [isRectangle, setIsRectangle] = useState(false);
  const [isArc, setIsArc] = useState(false);
  const [isLine, setIsLine] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [isBrush, setIsBrush] = useState(true);
  const [isBrushRainbowTool, setIsBrushRainbowTool] = useState(false);

  const [currentCursor, setCurrentCursor] = useState("default");

  const setEraserTool = () => {
    if (isEraser) {
      return;
    }
    setCurrentCursor("eraser");
    resetButtons();
    setCurrentTool("eraser");
    updateValues();
    setEraserColor();
    setIsEraser(!isEraser);
  };

  const setRectangleTool = () => {
    if (isRectangle) {
      return;
    }
    setCurrentCursor("crosshair");
    resetButtons();
    setCurrentTool("rectangle");
    updateValues();
    contextRef.current.lineJoin = "miter";
    context2Ref.current.lineJoin = "miter";
    setIsRectangle(!isRectangle);
  };

  const setArcTool = () => {
    if (isArc) {
      return;
    }
    setCurrentCursor("crosshair");
    resetButtons();
    setCurrentTool("arc");
    updateValues();
    setIsArc(!isArc);
  };

  const setBrushTool = () => {
    if (isBrush) {
      return;
    }
    setCurrentCursor("default");
    resetButtons();
    updateValues();
    setIsBrush(!isBrush);
    setCurrentTool("brush");
    if (isColorRainbow) {
      setCurrentTool("brushRainbow");
    } else {
      setCurrentTool("brush");
    }
  };

  const setLineTool = () => {
    if (isLine) {
      return;
    }
    setCurrentCursor("crosshair");
    resetButtons();
    setCurrentTool("line");
    updateValues();
    setIsLine(!isLine);
  };

  const setBrushRainbowTool = () => {
    if (isBrushRainbowTool) {
      return;
    }
    resetButtons();
    setCurrentTool("brushRainbow");
    setIsBrushRainbowTool(!isBrushRainbowTool);
    setCurrentCursor("nyanCat");
    setNyanCatValues();
  };

  const handleStrokeSolid = () => {
    setIsStroke(!isStroke);
  };

  const resetButtons = () => {
    setIsRectangle(false);
    setIsArc(false);
    setIsLine(false);
    setIsEraser(false);
    setIsBrush(false);
    setIsBrushRainbowTool(false);
    setIsNyanCat(false);
  };

  const handleWidthChange = (e) => {
    const { value } = e.target;
    let newLineWidth = value;
    setWidth(newLineWidth);
    contextRef.current.lineWidth = newLineWidth;
    context2Ref.current.lineWidth = newLineWidth;
  };

  const updateValues = () => {
    contextRef.current.strokeStyle = currentColor;
    contextRef.current.lineWidth = width;
    contextRef.current.lineJoin = "round";
    context2Ref.current.lineJoin = "round";
    context2Ref.current.strokeStyle = currentColor;
    context2Ref.current.lineWidth = width;
  };

  function isRectangleOrArc() {
    return isRectangle || isArc;
  }

  function WidthLabel() {
    return <h4 className="slider-width-label">Width: {width}</h4>;
  }

  useEffect(() => {
    handleCursorChange(currentCursor);
  }, [width, currentCursor]);

  return (
    <>
      <div className="container-tools-btns tools-section">
        <button
          onClick={setRectangleTool}
          className={`btn btn-tools btn-rectangle ${
            isRectangle ? "btn-toggled" : ""
          }`}
        ></button>
        <button
          onClick={setArcTool}
          className={`btn btn-tools btn-arc ${isArc ? "btn-toggled" : ""}`}
        ></button>
        <button
          onClick={setLineTool}
          className={`btn btn-tools btn-line ${isLine ? "btn-toggled" : ""}`}
        ></button>
        <button
          onClick={setEraserTool}
          className={`btn btn-tools btn-eraser ${
            isEraser ? "btn-toggled" : ""
          }`}
        ></button>
        <button
          onClick={setBrushTool}
          className={`btn btn-tools btn-brush ${isBrush ? "btn-toggled" : ""}`}
        ></button>
        <button
          onClick={setBrushRainbowTool}
          className={`btn btn-tools btn-nyanCat ${
            isBrushRainbowTool ? "btn-nyanCat-toggled" : ""
          }`}
        ></button>
      </div>

      <select
        disabled={!isRectangleOrArc()}
        value={isStroke}
        onChange={handleStrokeSolid}
        className="select-stroke-solid"
        style={isNyanCat ? { opacity: "0", cursor: "default" } : {}}
      >
        <option value={true} className="select-stroke-solid-option">
          Stroke
        </option>
        <option value={false} className="select-stroke-solid-option">
          Fill
        </option>
      </select>

      <div className="container-slider-width">
        {!isNyanCat ? <WidthLabel /> : <LogoNyanCat />}
        <input
          disabled={isNyanCat}
          defaultValue={width}
          type="range"
          min="5"
          max="80"
          onChange={handleWidthChange}
          className="slider-width"
          style={isNyanCat ? { opacity: "0" } : {}}
        />
      </div>
    </>
  );
}
