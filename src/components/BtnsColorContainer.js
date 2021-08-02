import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import * as services from "../services/services";

const listOfColors = services.getColors();

const useStyles = makeStyles((theme) => ({
  btnColors: {
    borderColor: "transparent",
    height: "20px",
    width: "20px",
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #00FFFF",
    },
  },
  btnColorsDisabled: {
    borderColor: "transparent",
    height: "20px",
    width: "20px",
    cursor: "not-allowed",
  },
}));

export default function BtnsColorContainer(props) {
  const classes = useStyles();
  const { handleColorPaletteChange, isColorChangeNotAllowed } = props;

  return (
    <>
      {listOfColors.map((item) => (
        <button
          disabled={isColorChangeNotAllowed()}
          onClick={() => handleColorPaletteChange(item.value)}
          className={
            !isColorChangeNotAllowed()
              ? classes.btnColors
              : classes.btnColorsDisabled
          }
          style={{ backgroundColor: item.value }}
        ></button>
      ))}
    </>
  );
}
