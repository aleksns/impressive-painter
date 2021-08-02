import React from "react";
import "../App.css";

export default function Eraser(context2Ref, width, widthHalf) {
  const eraserColor = "#FFFFFF";
  const cursorEraser = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" stroke="black" fill="white" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="white" /></svg>') ${widthHalf} ${widthHalf}, auto`;

  const setEraserColor = () => {
    context2Ref.current.strokeStyle = eraserColor;
  };

  return {
    setEraserColor,
    cursorEraser,
  };
}
