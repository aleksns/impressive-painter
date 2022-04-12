import React, { useState } from "react";
import "../App.css";
import cursornyancat from "../images/cursornyancat.png"

export default function NyanCat(context2Ref) {
  //const cursorNyanCat = `url(cursornyancat.png) 34 34, auto`;
  const cursorNyanCat = `url(${cursornyancat}) 34 34, auto`;
  const [isNyanCat, setIsNyanCat] = useState(false);

  const setNyanCatValues = () => {
    setIsNyanCat(!isNyanCat);
    context2Ref.current.lineWidth = 60;
  };

  return {
    cursorNyanCat,
    setNyanCatValues,
    isNyanCat,
    setIsNyanCat,
  };
}
