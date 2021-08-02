import "../App.css";

export default function Arc(
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
) {
  var endX;

  const handleArcFill = (contextRefValue) => {
    if (isStrokeRef.current) {
      contextRefValue.current.stroke();
    } else {
      //contextRefValue.current.fillStyle = currentColor;
      contextRefValue.current.fill();
    }
  };

  const finishDrawingArc = () => {
    let radius = endX - startX.current;

    if (radius < 0) {
      radius = radius * -1;
    }

    context2Ref.current.beginPath();
    context2Ref.current.moveTo(startX.current + radius, startY.current);
    context2Ref.current.arc(startX.current, startY.current, radius, 0, Math.PI * 2, true);
    handleArcFill(context2Ref);

    clearTheCanvas(contextRef, canvasRef);
    isMouseDown.current = false;
  };

  const drawArc = (e) => {
    var { x, y } = getScaledCoordinates(e);
    endX = x;

    clearTheCanvas(contextRef, canvasRef);
    let radius = endX - startX.current;

    if (radius < 0) {
      radius = radius * -1;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX.current + radius, startY.current);
    contextRef.current.arc(startX.current, startY.current, radius, 0, Math.PI * 2, true);
    handleArcFill(contextRef);
  };

  return { finishDrawingArc, drawArc };
}
