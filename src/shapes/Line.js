import React from "react";
import "../App.css";

export default function Line(
  contextRef,
  context2Ref,
  canvasRef,
  clearTheCanvas,
  isMouseDown,
  setIsMouseDown,
  startX,
  startY,
  getScaledMouseCoordinates
) {
  var endX;
  var endY;

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
    var { x, y } = getScaledMouseCoordinates({ nativeEvent });
    endX = x;
    endY = y;

    clearTheCanvas(contextRef, canvasRef);

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(endX, endY);
    contextRef.current.stroke();

    contextRef.current.closePath();
    context2Ref.current.closePath();
  };

  return { finishDrawingLine, drawLine };
}
