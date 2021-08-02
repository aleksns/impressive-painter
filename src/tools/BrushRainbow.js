import { useRef } from "react";
import "../App.css";

export default function BrushRainbow(
  context2Ref,
  setCurrentColor,
  getScaledCoordinates
) {

  const hue = useRef(0);

  const drawBrushRainbow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    rainbowColorChange();

    var { x, y } = getScaledCoordinates(e);

    context2Ref.current.lineTo(x, y);
    context2Ref.current.stroke();
    context2Ref.current.beginPath();
    context2Ref.current.moveTo(x, y);
    context2Ref.current.stroke();
  };

  const rainbowColorChange = () => {
    let newColor = `hsl(${hue.current},${100}%,${50}%)`;
    updateColorValues(newColor);

    hue.current = hue.current + 1;
    if (hue.current >= 360) {
      hue.current = 0;
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
