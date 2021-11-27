import React, { useState } from "react";
import "../App.css";

export default function BrushRainbow(
  context2Ref,
  setCurrentColor,
  getScaledMouseCoordinates,
  isMouseDown
) {
  const [hue, setHue] = useState(0);

  const drawBrushRainbow = ({ nativeEvent }) => {
    if (!isMouseDown) {
      return;
    }
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    rainbowColorChange();

    var { x, y } = getScaledMouseCoordinates({ nativeEvent });

    context2Ref.current.lineTo(x, y);
    context2Ref.current.stroke();
    context2Ref.current.beginPath();
    context2Ref.current.moveTo(x, y);
    context2Ref.current.stroke();
  };

  const rainbowColorChange = () => {
    let newColor = `hsl(${hue},${100}%,${50}%)`;
    updateColorValues(newColor);

    let prevHue = hue;
    setHue(prevHue + 1);
    if (hue >= 360) {
      setHue(0);
    }
  };

  const updateColorValues = (newColor) => {
    context2Ref.current.strokeStyle = newColor;
    setCurrentColor(newColor);
  };

  return {
    drawBrushRainbow,
    rainbowColorChange,
  };
}
