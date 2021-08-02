import "../App.css";

export default function Line(
  contextRef,
  context2Ref,
  canvasRef,
  clearTheCanvas,
  isMouseDown,
  startX,
  startY,
  getScaledCoordinates
) {
  var endX;
  var endY;

  const finishDrawingLine = () => {
    context2Ref.current.beginPath();
    context2Ref.current.moveTo(startX.current, startY.current);
    context2Ref.current.lineTo(endX, endY);
    context2Ref.current.stroke();

    contextRef.current.closePath();
    context2Ref.current.closePath();

    clearTheCanvas(contextRef, canvasRef);
    isMouseDown.current = false;
  };

  const drawLine = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    var { x, y } = getScaledCoordinates(e);
    endX = x;
    endY = y;

    clearTheCanvas(contextRef, canvasRef);

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX.current, startY.current);
    contextRef.current.lineTo(endX, endY);
    contextRef.current.stroke();

    contextRef.current.closePath();
    context2Ref.current.closePath();
  };

  return { finishDrawingLine, drawLine };
}
