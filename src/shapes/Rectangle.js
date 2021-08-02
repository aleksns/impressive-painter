import React, { useState } from "react";
import "../App.css";

export default function Rectangle(
  context2Ref,
  contextRef,
  canvasRef,
  clearTheCanvas,
  isStroke,
  currentColor
) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  var endX;
  var endY;
  var width;
  var height;

  const handleRectFill = (contextRefValue) => {
    if (isStroke) {
      contextRefValue.current.strokeRect(startX, startY, width, height);
    } else {
      contextRefValue.current.fillStyle = currentColor;
      contextRefValue.current.fillRect(startX, startY, width, height);
    }
  };

  const startDrawingRect = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    const { offsetX, offsetY } = nativeEvent;

    setStartX(offsetX);
    setStartY(offsetY);
    setIsMouseDown(true);
  };

  const finishDrawingRect = () => {
    handleRectFill(context2Ref);
    clearTheCanvas(contextRef, canvasRef);
    setIsMouseDown(false);
  };

  const drawRect = ({ nativeEvent }) => {
    if (!isMouseDown) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    endX = offsetX;
    endY = offsetY;

    clearTheCanvas(contextRef, canvasRef);
    width = endX - startX;
    height = endY - startY;
    handleRectFill(contextRef);
  };

  return {
    startDrawingRect,
    finishDrawingRect,
    drawRect,
  };
}
