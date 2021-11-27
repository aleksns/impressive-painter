import React from "react";
import "../App.css";
import * as services from "../services/services";

const listOfColors = services.getColors();

export default function BtnsColorContainer(props) {
  const { handleColorPaletteChange, isColorChangeNotAllowed, isNyanCat } = props;

  return (
    <>
      <div className="container-colors-palette">
        <div className="colors-palette-background"></div>
        <div className="grid-colors-palette">
          {listOfColors.map((item) => (
            <button
              key={item.id}
              disabled={isColorChangeNotAllowed()}
              onClick={() => handleColorPaletteChange(item.value)}
              className="btn-colors-palette"
              style={
                isNyanCat
                  ? { cursor: "default" }
                  : { backgroundColor: item.value }
              }
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}
