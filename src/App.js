import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import ShapesComponent from "./shapes/ShapesComponent";
import BrushComponent from "./tools/BrushComponent";
import NyanCat from "./tools/NyanCat";
import Canvas from "./components/Canvas";
import HeaderComponent from "./components/HeaderComponent";

var isTouchEvent = !matchMedia("(pointer:fine)").matches || "ontouchstart" in window;

export default function App() {
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  const contextRef = useRef(null);
  const context2Ref = useRef(null);
  const isMouseDown = useRef(false);

  const currentTool = useRef("brush");
  const [isStroke, setIsStroke] = useState(true);
  const isStrokeRef = useRef(isStroke);

  const [currentColor, setCurrentColor] = useState("#000000");
  const [isColorRainbow, setIsColorRainbow] = useState(false);

  const [width, setWidth] = useState(isTouchEvent? 10 : 30);
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
    isStrokeRef,
    currentColor,
    getScaledCoordinates,
    isMouseDown
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
    getScaledCoordinates,
    isMouseDown,
    width,
    widthHalf
  );

  const { cursorNyanCat, setNyanCatValues, isNyanCat, setIsNyanCat } =
    NyanCat(context2Ref);

  const handleMouseDown = (e) => {
    switch (currentTool.current) {
      case "brush":
      case "eraser":
        startDrawingBrush(e);
        break;

      case "brushRainbow":
        rainbowColorChange();
        startDrawingBrush(e);
      break;

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
    switch (currentTool.current) {
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
    if (!isMouseDown.current) {
      return;
    }
    switch (currentTool.current) {
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

  const handleMouseOut = (e) => {
    isMouseDown.current = false;

    switch (currentTool.current) {
      case "arc":
        finishDrawingArc(e);
        break;

      case "line":
        finishDrawingLine(e);
        break;

      case "rectangle":
        finishDrawingRect(e);
        break;

      case "brush":
      case "eraser":
      case "brushRainbow":
        break;

      default:
        console.log("Error. Something went wrong handling 'Mouse OUT event'.");
        break;
    }
  };

  useEffect(() => {

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = currentColor;
    context.lineWidth = width;
    context.lineJoin = "round";
    contextRef.current = context;

    const canvas2 = canvas2Ref.current;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    const context2 = canvas2.getContext("2d");

    context2.lineCap = "round";
    context2.strokeStyle = currentColor;
    context2.lineWidth = width;
    context2.lineJoin = "round";
    context2Ref.current = context2;


    if (isTouchEvent) {
      canvasRef.current.addEventListener("touchstart", handleMouseDown, {
        passive: false,
      });
      canvasRef.current.addEventListener("touchend", handleMouseUp, {
        passive: false,
      });
      canvasRef.current.addEventListener("touchmove", handleMouseMove, {
        passive: false,
      });
    } else {
      canvasRef.current.addEventListener("mousedown", handleMouseDown, {
        passive: false,
      });
      canvasRef.current.addEventListener("mouseup", handleMouseUp, {
        passive: false,
      });
      canvasRef.current.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      canvasRef.current.addEventListener("mouseout", handleMouseOut, {
        passive: false,
      });
    }
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

  function getScaledCoordinates(e) {
    // calculate coordinates for the current resolution
    var bounds = canvas2Ref.current.getBoundingClientRect();

    var x;
    var y;

    if (isTouchEvent) {
      x = e.targetTouches[0].pageX - bounds.left;
      y = e.targetTouches[0].pageY - bounds.top;
    } else {
      x = e.clientX - bounds.left;
      y = e.clientY - bounds.top;
    }

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
        width={width}
        setWidth={setWidth}
        handleCursorChange={handleCursorChange}
        setEraserColor={setEraserColor}
        isStroke={isStroke}
        setIsStroke={setIsStroke}
        isStrokeRef={isStrokeRef}
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
      />
    </>
  );
}
