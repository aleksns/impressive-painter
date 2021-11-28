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
    handleMouseOut
  } = props;

  return (
    <>
      <canvas
        id="draft-layer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        ref={canvasRef}
        style={{ cursor: cursorCustom, zIndex: "1" }}
        className="canvas"
      />
      <canvas
        id="main-layer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        ref={canvas2Ref}
        style={{ zIndex: "0" }}
        className="canvas"
      />
    </>
  );
}
