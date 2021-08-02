import React, { useState } from "react";
import "../App.css";

export default function Line(
  context2Ref,
  contextRef,
  canvasRef,
  clearTheCanvas
) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  var endX;
  var endY;

  const startDrawingLine = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    const { offsetX, offsetY } = nativeEvent;

    setStartX(offsetX);
    setStartY(offsetY);

    setIsMouseDown(true);
  };

  const finishDrawingLine = () => {
    context2Ref.current.beginPath();
    context2Ref.current.moveTo(startX, startY);
    context2Ref.current.lineTo(endX, endY);
    context2Ref.current.stroke();

    contextRef.current.closePath();
    context2Ref.current.closePath();

    clearTheCanvas(contextRef, canvasRef);
    setIsMouseDown(false);
  };

  const drawLine = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    if (!isMouseDown) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    endX = offsetX;
    endY = offsetY;

    clearTheCanvas(contextRef, canvasRef);

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(endX, endY);
    contextRef.current.stroke();

    contextRef.current.closePath();
    context2Ref.current.closePath();
  };

  return { startDrawingLine, finishDrawingLine, drawLine };
}
