import React, { useState } from "react";
import "../App.css";
import Arc from "./Arc";
import Rectangle from "./Rectangle";
import Line from "./Line";

export default function ShapesComponent(
  contextRef,
  context2Ref,
  canvasRef,
  clearTheCanvas,
  isStroke,
  currentColor,
  getScaledMouseCoordinates,
  isMouseDown,
  setIsMouseDown
) {
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  const { finishDrawingArc, drawArc } = Arc(
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
  );
  const { finishDrawingRect, drawRect } = Rectangle(
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
  );
  const { finishDrawingLine, drawLine } = Line(
    contextRef,
    context2Ref,
    canvasRef,
    clearTheCanvas,
    isMouseDown,
    setIsMouseDown,
    startX,
    startY,
    getScaledMouseCoordinates
  );

  const startDrawingShape = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    var { x, y } = getScaledMouseCoordinates({ nativeEvent });

    setStartX(x);
    setStartY(y);
    setIsMouseDown(true);
  };

  return {
    startDrawingShape,
    finishDrawingArc,
    drawArc,
    finishDrawingRect,
    drawRect,
    finishDrawingLine,
    drawLine
  };
}
