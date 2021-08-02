import React from "react";
import "../App.css";

export default function Canvas(props) {
  const {
    cursorCustom,
    canvasRef,
    canvas2Ref,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = props;

  return (
    <div className="canvas-box">
      <div className="canvas-background"></div>
      <canvas
        id="draft-layer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        className="canvas-layer1"
        style={{ cursor: cursorCustom }}
      />
      <canvas
        id="main-layer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvas2Ref}
        className="canvas-layer2"
      />
    </div>
  );
}
