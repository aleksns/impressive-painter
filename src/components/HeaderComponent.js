import React from "react";
import ClearAndSave from "./ClearAndSave";
import ToolsContainer from "./ToolsContainer";
import ColorPalette from "./ColorPalette";
import GithubLinkWithIcon from "./GithubLinkWithIcon";

export default function HeaderComponent(props) {
  const {
    contextRef,
    context2Ref,
    canvasRef,
    canvas2Ref,
    clearTheCanvas,
    currentColor,
    setCurrentColor,
    currentTool,
    width,
    setWidth,
    handleCursorChange,
    setEraserColor,
    isStroke,
    setIsStroke,
    isStrokeRef,
    isColorRainbow,
    setIsColorRainbow,
    isNyanCat,
    setIsNyanCat,
    setNyanCatValues,
  } = props;

  return (
      <header
        style={
          isNyanCat
            ? {
                backgroundColor: currentColor,
                boxShadow: `0 0 50px ${currentColor}`,
                filter: "brightness(95%)",
              }
            : {}
        }
      >
        <ClearAndSave
          contextRef={contextRef}
          context2Ref={context2Ref}
          canvasRef={canvasRef}
          canvas2Ref={canvas2Ref}
          clearTheCanvas={clearTheCanvas}
        />
        <ToolsContainer
          contextRef={contextRef}
          context2Ref={context2Ref}
          currentColor={currentColor}
          currentTool={currentTool}    
          width={width}
          setWidth={setWidth}
          handleCursorChange={handleCursorChange}
          setEraserColor={setEraserColor}
          isStroke={isStroke}
          setIsStroke={setIsStroke}
          isStrokeRef={isStrokeRef}
          isColorRainbow={isColorRainbow}
          isNyanCat={isNyanCat}
          setIsNyanCat={setIsNyanCat}
          setNyanCatValues={setNyanCatValues}
        />
        <ColorPalette
          contextRef={contextRef}
          context2Ref={context2Ref}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          currentTool={currentTool}
          isColorRainbow={isColorRainbow}
          setIsColorRainbow={setIsColorRainbow}
          isNyanCat={isNyanCat}
        />
        <GithubLinkWithIcon />
      </header>
  );
}
