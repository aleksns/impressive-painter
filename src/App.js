import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import ShapesComponent from "./shapes/ShapesComponent";
import BrushComponent from "./tools/BrushComponent";
import NyanCat from "./tools/NyanCat";
import Canvas from "./components/Canvas";
import HeaderComponent from "./components/HeaderComponent";

export default function App() {
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  const contextRef = useRef(null);
  const context2Ref = useRef(null);

  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentTool, setCurrentTool] = useState("brush");
  const [isStroke, setIsStroke] = useState(true);
  const [isColorRainbow, setIsColorRainbow] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [width, setWidth] = useState(40);
  const widthHalf = width / 2;

  const cursorDefault = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.2" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;
  const cursorCrosshair = "crosshair";
  const [cursorCustom, setCursorCustom] = useState(cursorDefault);

  const clearTheCanvas = (contextRefValue, canvasRefValue) => {
    contextRefValue.current.clearRect(
      0,
      0,
      canvasRefValue.current.width,
      canvasRefValue.current.height
    );
  };

  const {
    startDrawingShape,
    finishDrawingArc,
    drawArc,
    finishDrawingRect,
    drawRect,
    finishDrawingLine,
    drawLine,
  } = ShapesComponent(
    contextRef,
    context2Ref,
    canvasRef,
    clearTheCanvas,
    isStroke,
    currentColor,
    getScaledMouseCoordinates,
    isMouseDown,
    setIsMouseDown
  );

  const {
    startDrawingBrush,
    finishDrawingBrush,
    drawBrush,
    setEraserColor,
    cursorEraser,
    drawBrushRainbow,
    rainbowColorChange,
  } = BrushComponent(
    context2Ref,
    setCurrentColor,
    getScaledMouseCoordinates,
    isMouseDown,
    setIsMouseDown,
    width,
    widthHalf
  );

  const { cursorNyanCat, setNyanCatValues, isNyanCat, setIsNyanCat } =
    NyanCat(context2Ref);

  const handleMouseDown = (e) => {
    switch (currentTool) {
      case "brush":
      case "eraser":
        startDrawingBrush(e);
        break;

      case "brushRainbow":
        rainbowColorChange();
        startDrawingBrush(e);

      case "arc":
      case "rectangle":
      case "line":
        startDrawingShape(e);
        break;

      default:
        console.log("Error. Something went wrong handling 'Mouse DOWN event'.");
        break;
    }
  };

  const handleMouseUp = (e) => {
    switch (currentTool) {
      case "brush":
      case "eraser":
      case "brushRainbow":
        finishDrawingBrush(e);
        break;

      case "arc":
        finishDrawingArc(e);
        break;

      case "rectangle":
        finishDrawingRect(e);
        break;

      case "line":
        finishDrawingLine(e);
        break;

      default:
        console.log("Error. Something went wrong handling 'Mouse UP event'.");
        break;
    }
  };

  const handleMouseMove = (e) => {
    switch (currentTool) {
      case "brush":
      case "eraser":
        drawBrush(e);
        break;

      case "brushRainbow":
        drawBrushRainbow(e);
        break;

      case "arc":
        drawArc(e);
        break;

      case "rectangle":
        drawRect(e);
        break;

      case "line":
        drawLine(e);
        break;

      default:
        console.log("Error. Something went wrong handling 'Mouse MOVE event'.");
        break;
    }
  };

  useEffect(() => {
    //draft canvas
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = currentColor;
    context.lineWidth = width;
    context.lineJoin = "round";
    contextRef.current = context;

    //main canvas
    const canvas2 = canvas2Ref.current;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    const context2 = canvas2.getContext("2d");

    context2.lineCap = "round";
    context2.strokeStyle = currentColor;
    context2.lineWidth = width;
    context2.lineJoin = "round";
    context2Ref.current = context2;
  }, []);

  const handleCursorChange = (cursorValue) => {
    switch (cursorValue) {
      case "default":
        setCursorCustom(cursorDefault);
        break;

      case "crosshair":
        setCursorCustom(cursorCrosshair);
        break;

      case "eraser":
        setCursorCustom(cursorEraser);
        break;

      case "nyanCat":
        setCursorCustom(cursorNyanCat);
        break;

      default:
        console.log("Error. Something went wrong in 'handleCursorChange'");
        break;
    }
  };

  function getScaledMouseCoordinates({ nativeEvent }) {
    // calculate coordinates for the current resolution
    var bounds = canvas2Ref.current.getBoundingClientRect();
    const { offsetX, offsetY } = nativeEvent;

    var x = offsetX;
    var y = offsetY;
    x = x / bounds.width;
    y = y / bounds.height;

    x = Math.floor(x * canvas2Ref.current.width);
    y = Math.floor(y * canvas2Ref.current.height);

    return {
      x,
      y,
    };
  }

  return (
    <>
      <HeaderComponent
        contextRef={contextRef}
        context2Ref={context2Ref}
        canvasRef={canvasRef}
        canvas2Ref={canvas2Ref}
        clearTheCanvas={clearTheCanvas}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        width={width}
        setWidth={setWidth}
        handleCursorChange={handleCursorChange}
        setEraserColor={setEraserColor}
        isStroke={isStroke}
        setIsStroke={setIsStroke}
        isColorRainbow={isColorRainbow}
        setIsColorRainbow={setIsColorRainbow}
        isNyanCat={isNyanCat}
        setIsNyanCat={setIsNyanCat}
        setNyanCatValues={setNyanCatValues}
      />

      <Canvas
        cursorCustom={cursorCustom}
        canvasRef={canvasRef}
        canvas2Ref={canvas2Ref}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseMove={handleMouseMove}
      />
    </>
  );
}
