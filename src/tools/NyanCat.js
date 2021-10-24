import React, { useState } from "react";
import "../App.css";

export default function NyanCat(context2Ref) {
  const cursorNyanCat = `url(cursor-nyancat.png) 34 34, auto`;
  const [isNyanCat, setIsNyanCat] = useState(false);

  const setNyanCatValues = () => {
    setIsNyanCat(!isNyanCat);
    context2Ref.current.lineWidth = 50;
  };

  return {
    cursorNyanCat,
    setNyanCatValues,
    isNyanCat,
    setIsNyanCat,
  };
}
