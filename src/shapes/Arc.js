import React, { useState } from "react";
import "../App.css";

export default function Arc(
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

  const handleArcFill = (contextRefValue) => {
    if (isStroke) {
      contextRefValue.current.stroke();
    } else {
      contextRefValue.current.fillStyle = currentColor;
      contextRefValue.current.fill();
    }
  };

  const startDrawingArc = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    const { offsetX, offsetY } = nativeEvent;

    setStartX(offsetX);
    setStartY(offsetY);

    setIsMouseDown(true);
  };

  const finishDrawingArc = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    endX = offsetX;
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
    const { offsetX, offsetY } = nativeEvent;

    endX = offsetX;
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

  return { startDrawingArc, finishDrawingArc, drawArc };
}
