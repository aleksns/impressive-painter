import React from "react";
import "../App.css";

export default function Arc(
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

  const handleArcFill = (contextRefValue) => {
    if (isStroke) {
      contextRefValue.current.stroke();
    } else {
      contextRefValue.current.fillStyle = currentColor;
      contextRefValue.current.fill();
    }
  };

  const finishDrawingArc = () => {
    let radius = endX - startX;

    if (radius < 0) {
      radius = radius * -1;
    }

    context2Ref.current.beginPath();
    context2Ref.current.moveTo(startX + radius, startY);
    context2Ref.current.arc(startX, startY, radius, 0, Math.PI * 2, true);
    handleArcFill(context2Ref);

    clearTheCanvas(contextRef, canvasRef);
    setIsMouseDown(false);
  };

  const drawArc = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    if (!isMouseDown) {
      return;
    }
    var { x, y } = getScaledMouseCoordinates({ nativeEvent });
    endX = x;

    clearTheCanvas(contextRef, canvasRef);
    let radius = endX - startX;

    if (radius < 0) {
      radius = radius * -1;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX + radius, startY);
    contextRef.current.arc(startX, startY, radius, 0, Math.PI * 2, true);
    handleArcFill(contextRef);
  };

  return { finishDrawingArc, drawArc };
}
