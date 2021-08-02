import { useRef } from "react";
import "../App.css";
import Arc from "./Arc";
import Rectangle from "./Rectangle";
import Line from "./Line";

export default function ShapesComponent(
  contextRef,
  context2Ref,
  canvasRef,
  clearTheCanvas,
  isStrokeRef,
  currentColor,
  getScaledCoordinates,
  isMouseDown
) {
  const startX = useRef(null);
  const startY = useRef(null);

  const { finishDrawingArc, drawArc } = Arc(
    contextRef,
    context2Ref,
    canvasRef,
    clearTheCanvas,
    isStrokeRef,
    currentColor,
    isMouseDown,
    startX,
    startY,
    getScaledCoordinates
  );
  const { finishDrawingRect, drawRect } = Rectangle(
    contextRef,
    context2Ref,
    canvasRef,
    clearTheCanvas,
    isStrokeRef,
    currentColor,
    isMouseDown,
    startX,
    startY,
    getScaledCoordinates
  );
  const { finishDrawingLine, drawLine } = Line(
    contextRef,
    context2Ref,
    canvasRef,
    clearTheCanvas,
    isMouseDown,
    startX,
    startY,
    getScaledCoordinates
  );

  const startDrawingShape = (e) => {
    e.preventDefault();
    e.stopPropagation();

    var { x, y } = getScaledCoordinates(e);

    startX.current = x;
    startY.current = y;

    isMouseDown.current = true;
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
