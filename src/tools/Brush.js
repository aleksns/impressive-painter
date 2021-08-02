import React, { useState } from "react";
import "../App.css";

export default function Brush(context2Ref) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const startDrawingBrush = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    setIsMouseDown(true);
    const { offsetX, offsetY } = nativeEvent;

    context2Ref.current.beginPath();
    context2Ref.current.moveTo(offsetX, offsetY);

    context2Ref.current.lineTo(offsetX, offsetY);
    context2Ref.current.stroke();
  };

  const finishDrawingBrush = (e) => {
    context2Ref.current.closePath();
    setIsMouseDown(false);
  };

  const drawBrush = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    if (!isMouseDown) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    context2Ref.current.lineTo(offsetX, offsetY);
    context2Ref.current.stroke();
  };

  return {
    startDrawingBrush,
    finishDrawingBrush,
    drawBrush,
  };
}
