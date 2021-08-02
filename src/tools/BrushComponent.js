import "../App.css";
import Brush from "./Brush";
import Eraser from "./Eraser";
import BrushRainbow from "./BrushRainbow";

export default function BrushComponent(
  context2Ref,
  setCurrentColor,
  getScaledCoordinates,
  isMouseDown,
  width,
  widthHalf
) {
  const { drawBrush } = Brush(
    context2Ref,
    getScaledCoordinates
  );

  const { setEraserColor, cursorEraser } = Eraser(
    context2Ref,
    width,
    widthHalf
  );

  const { drawBrushRainbow, rainbowColorChange } = BrushRainbow(
    context2Ref,
    setCurrentColor,
    getScaledCoordinates,
    isMouseDown
  );

  const startDrawingBrush = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    isMouseDown.current = true;

    var { x, y } = getScaledCoordinates(e);

    context2Ref.current.beginPath();
    context2Ref.current.moveTo(x, y);

    context2Ref.current.lineTo(x, y);
    context2Ref.current.stroke();
  };

  const finishDrawingBrush = (e) => {
    context2Ref.current.closePath();
    isMouseDown.current = false;
  };

  return {
    startDrawingBrush,
    finishDrawingBrush,
    drawBrush,
    setEraserColor,
    cursorEraser,
    drawBrushRainbow,
    rainbowColorChange,
  };
}
