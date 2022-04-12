import "../App.css";

export default function Rectangle(
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
  var endY;

  var width;
  var height;

  const handleRectFill = (contextRefValue) => {
    if (isStrokeRef.current) {
      contextRefValue.current.strokeRect(startX.current, startY.current, width, height);
    } else {
      //contextRefValue.current.fillStyle = currentColor;
      contextRefValue.current.fillRect(startX.current, startY.current, width, height);
    }
  };

  const finishDrawingRect = () => {
    handleRectFill(context2Ref);
    clearTheCanvas(contextRef, canvasRef);
    isMouseDown.current = false;
  };

  const drawRect = (e) => {
    var { x, y } = getScaledCoordinates(e);
    endX = x;
    endY = y;

    clearTheCanvas(contextRef, canvasRef);
    width = endX - startX.current;
    height = endY - startY.current;
    handleRectFill(contextRef);
  };

  return { finishDrawingRect, drawRect };
}
