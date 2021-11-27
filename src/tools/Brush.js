import React, { useState } from "react";
import "../App.css";

export default function Brush(
  context2Ref,
  getScaledMouseCoordinates,
  isMouseDown
) {
  const drawBrush = ({ nativeEvent }) => {
    if (!isMouseDown) {
      return;
    }
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    var { x, y } = getScaledMouseCoordinates({ nativeEvent });

    context2Ref.current.lineTo(x, y);
    context2Ref.current.stroke();
  };

  return {
    drawBrush,
  };
}
