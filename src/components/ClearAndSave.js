import React, { useState } from "react";
import "../App.css";

export default function ClearAndSave(props) {
  const { contextRef, context2Ref, canvasRef, canvas2Ref, clearTheCanvas } =
    props;

  const [dataUrl, setDataUrl] = useState("#");

  const handleclearAll = () => {
    clearTheCanvas(contextRef, canvasRef);
    clearTheCanvas(context2Ref, canvas2Ref);
  };

  const handleDownload = () => {
    if (!canvas2Ref.current) {
      return;
    }
    setDataUrl(canvas2Ref.current.toDataURL("nice-drawing/png"));
  };

  return (
    <>
      <div className="container-clear-save">
        <button onClick={handleclearAll} className="btn btn-clear">
          CLEAR
        </button>
        <a download="nice-drawing.png" onClick={handleDownload} href={dataUrl}>
          SAVE
        </a>
      </div>
    </>
  );
}
