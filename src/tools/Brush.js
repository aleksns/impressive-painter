import "../App.css";

export default function Brush(
  context2Ref,
  getScaledCoordinates
) {
  const drawBrush = (e) => {
    e.preventDefault();
    e.stopPropagation();

    var { x, y } = getScaledCoordinates(e);

    context2Ref.current.lineTo(x, y);
    context2Ref.current.stroke();
  };

  return {
    drawBrush,
  };
}
