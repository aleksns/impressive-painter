import React, { useState } from "react";
import "../App.css";
import Brush from "./Brush";
import Eraser from "./Eraser";
import BrushRainbow from "./BrushRainbow";

export default function BrushComponent(
  context2Ref,
  setCurrentColor,
  getScaledMouseCoordinates,
  isMouseDown,
  setIsMouseDown,
  width,
  widthHalf
) {
  const { drawBrush } = Brush(
    context2Ref,
    getScaledMouseCoordinates,
    isMouseDown
  );

  const { setEraserColor, cursorEraser } = Eraser(
    context2Ref,
    width,
    widthHalf
  );

  const { drawBrushRainbow, rainbowColorChange } = BrushRainbow(
    context2Ref,
    setCurrentColor,
    getScaledMouseCoordinates,
    isMouseDown
  );

  const startDrawingBrush = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    setIsMouseDown(true);

    var { x, y } = getScaledMouseCoordinates({ nativeEvent });

    context2Ref.current.beginPath();
    context2Ref.current.moveTo(x, y);

    context2Ref.current.lineTo(x, y);
    context2Ref.current.stroke();
  };

  const finishDrawingBrush = (e) => {
    context2Ref.current.closePath();
    setIsMouseDown(false);
  };

  return {
    startDrawingBrush,
    finishDrawingBrush,
    drawBrush,
    setEraserColor,
    cursorEraser,
    drawBrushRainbow,
    rainbowColorChange,
  };
}
