import React, { useState } from "react";
import "../App.css";

export default function BrushRainbow(context2Ref, setCurrentColor) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hue, setHue] = useState(0);

  const startDrawingBrushRainbow = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    const { offsetX, offsetY } = nativeEvent;

    context2Ref.current.beginPath();
    context2Ref.current.moveTo(offsetX, offsetY);

    setIsMouseDown(true);
  };

  const finishDrawingBrushRainbow = (e) => {
    context2Ref.current.closePath();
    setIsMouseDown(false);
    let hexColor = convertHslToHex(hue, 100, 50);
    setCurrentColor(hexColor);
  };

  const drawBrushRainbow = ({ nativeEvent }) => {
    if (!isMouseDown) {
      return;
    }

    rainbowColorChange();

    const { offsetX, offsetY } = nativeEvent;
    context2Ref.current.lineTo(offsetX, offsetY);
    context2Ref.current.stroke();
    context2Ref.current.beginPath();
    context2Ref.current.moveTo(offsetX, offsetY);
    context2Ref.current.stroke();
  };

  const rainbowColorChange = () => {
    let newColor = `hsl(${hue},${100}%,${50}%)`;
    setCurrentColor(newColor);
    updateColorValues(newColor);

    let prevHue = hue;
    if (hue >= 360) {
      prevHue = 0;
    }
    setHue(prevHue + 1);
  };

  const updateColorValues = (newColor) => {
    context2Ref.current.strokeStyle = newColor;
  };

  function convertHslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  return {
    startDrawingBrushRainbow,
    finishDrawingBrushRainbow,
    drawBrushRainbow,
  };
}
