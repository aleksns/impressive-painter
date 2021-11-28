import React from "react";
import "../App.css";

export default function Rectangle(
  contextRef,
  context2Ref,
  canvasRef,
  clearTheCanvas,
  isStroke,
  currentColor,
  isMouseDown,
  setIsMouseDown,
  startX,
  startY,
  getScaledMouseCoordinates
) {
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

  const finishDrawingRect = () => {
    handleRectFill(context2Ref);
    clearTheCanvas(contextRef, canvasRef);
    setIsMouseDown(false);
  };

  const drawRect = ({ nativeEvent }) => {
    if (!isMouseDown) {
      return;
    }

    var { x, y } = getScaledMouseCoordinates({ nativeEvent });
    endX = x;
    endY = y;

    clearTheCanvas(contextRef, canvasRef);
    width = endX - startX;
    height = endY - startY;
    handleRectFill(contextRef);
  };

  return { finishDrawingRect, drawRect };
}
