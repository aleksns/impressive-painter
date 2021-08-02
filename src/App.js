import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Arc from "./shapes/Arc";
import Rectangle from "./shapes/Rectangle";
import Line from "./shapes/Line";
import Brush from "./tools/Brush";
import Eraser from "./tools/Eraser";
import NyanCat from "./tools/NyanCat";
import BrushRainbow from "./tools/BrushRainbow";
import Canvas from "./components/Canvas";
import HeaderComponents from "./components/HeaderComponents";

export default function App() {
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  const contextRef = useRef(null);
  const context2Ref = useRef(null);

  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentTool, setCurrentTool] = useState("brush");
  const [isStroke, setIsStroke] = useState(true);
  const [isColorRainbow, setIsColorRainbow] = useState(false);

  const [width, setWidth] = useState(15);
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

  const { startDrawingArc, finishDrawingArc, drawArc } = Arc(
    context2Ref,
    contextRef,
    canvasRef,
    clearTheCanvas,
    isStroke,
    currentColor
  );
  const { startDrawingRect, finishDrawingRect, drawRect } = Rectangle(
    context2Ref,
    contextRef,
    canvasRef,
    clearTheCanvas,
    isStroke,
    currentColor
  );
  const { startDrawingLine, finishDrawingLine, drawLine } = Line(
    context2Ref,
    contextRef,
    canvasRef,
    clearTheCanvas
  );
  const { startDrawingBrush, finishDrawingBrush, drawBrush } =
    Brush(context2Ref);

  const { setEraserColor, cursorEraser } = Eraser(
    context2Ref,
    width,
    widthHalf
  );

  const {
    startDrawingBrushRainbow,
    finishDrawingBrushRainbow,
    drawBrushRainbow,
  } = BrushRainbow(context2Ref, setCurrentColor);

  const { cursorNyanCat, setNyanCatValues, isNyanCat, setIsNyanCat } =
    NyanCat(context2Ref);

  const handleMouseDown = (e) => {
    switch (currentTool) {
      case "brush":
        startDrawingBrush(e);
        break;

      case "rectangle":
        startDrawingRect(e);
        break;

      case "arc":
        startDrawingArc(e);
        break;

      case "eraser":
        startDrawingBrush(e);
        break;

      case "line":
        startDrawingLine(e);
        break;

      case "brushRainbow":
        startDrawingBrushRainbow(e);
        break;

      default:
        console.log("Error. Something went wrong handling 'Mouse DOWN event'.");
        break;
    }
  };

  const handleMouseUp = (e) => {
    switch (currentTool) {
      case "brush":
        finishDrawingBrush(e);
        break;

      case "rectangle":
        finishDrawingRect(e);
        break;

      case "arc":
        finishDrawingArc(e);
        break;

      case "eraser":
        finishDrawingBrush(e);
        break;

      case "line":
        finishDrawingLine(e);
        break;

      case "brushRainbow":
        finishDrawingBrushRainbow(e);
        break;

      default:
        console.log("Error. Something went wrong handling 'Mouse UP event'.");
        break;
    }
  };

  const handleMouseMove = (e) => {
    switch (currentTool) {
      case "brush":
        drawBrush(e);
        break;

      case "rectangle":
        drawRect(e);
        break;

      case "arc":
        drawArc(e);
        break;

      case "eraser":
        drawBrush(e);
        break;

      case "line":
        drawLine(e);
        break;

      case "brushRainbow":
        drawBrushRainbow(e);
        break;

      default:
        console.log("Error. Something went wrong handling 'Mouse MOVE event'.");
        break;
    }
  };

  useEffect(() => {
    //first canvas (draft for shapes)
    const canvas = canvasRef.current;
    canvas.width = (window.innerWidth - 2) * 2;
    canvas.height = (window.innerHeight - 70) * 2;
    const context = canvas.getContext("2d");
    canvas.style.width = `${window.innerWidth - 2}px`;
    canvas.style.height = `${window.innerHeight - 70}px`;
    context.scale(2, 2);

    context.lineCap = "round";
    context.strokeStyle = currentColor;
    context.lineWidth = 15;
    context.lineJoin = "round";
    contextRef.current = context;

    //second canvas (main)
    const canvas2 = canvas2Ref.current;
    canvas2.width = (window.innerWidth - 2) * 2;
    canvas2.height = (window.innerHeight - 70) * 2;
    const context2 = canvas2.getContext("2d");
    canvas2.style.width = `${window.innerWidth - 2}px`;
    canvas2.style.height = `${window.innerHeight - 70}px`;
    context2.scale(2, 2);

    context2.lineCap = "round";
    context2.strokeStyle = currentColor;
    context2.lineWidth = 15;
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

  return (
    <>
      <div className="background-main"></div>
      <HeaderComponents
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
