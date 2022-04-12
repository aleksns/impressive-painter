import React from "react";
import "../App.css";

export default function Canvas(props) {
  const {
    cursorCustom,
    canvasRef,
    canvas2Ref,
    // handleMouseDown,
    // handleMouseUp,
    // handleMouseMove,
    // handleMouseOut,
    // handleStartTouch,
    // handleEndTouch,
    // handleMoveTouch
  } = props;

  return (
    <>
      <canvas
        id="main-layer" 
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseMove}
        // onMouseOut={handleMouseOut}
        // onTouchStart={handleStartTouch}
        // onTouchEnd={handleEndTouch}
        // onTouchMove={handleMoveTouch}
        ref={canvasRef}
        style={{ cursor: cursorCustom, zIndex: "1" }}
        className="canvas"
      />
      <canvas
        id="draft-layer"
        ref={canvas2Ref}
        style={{ zIndex: "0" }}
        className="canvas"
      />
    </>
  );
}
