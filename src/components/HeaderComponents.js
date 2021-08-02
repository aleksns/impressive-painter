import React from "react";
import ClearAndSave from "./ClearAndSave";
import ToolsContainer from "./ToolsContainer";
import ColorPalette from "./ColorPalette";
import GitLogo from "../images/github-icon.png";
import { makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gitLink: {
    position: "relative",
    top: "-5px",
    right: "-5px",
    textDecoration: "none",
    color: "#ffffff",
    fontFamily: "Century Gothic",
    fontSize: "1.1rem",
    fontWeight: "600",
    "&:hover": {
      filter:
        "invert(48%) sepia(13%) saturate(3207%) hue-rotate(170deg) brightness(100%) contrast(90%)",
    },
  },
  gitLogo: {
    position: "relative",
    top: "5px",
    right: "5px",
    width: "40px",
    height: "40px",
  },
}));

export default function HeaderComponents(props) {
  const classes = useStyles();

  const {
    contextRef,
    context2Ref,
    canvasRef,
    canvas2Ref,
    clearTheCanvas,
    currentColor,
    setCurrentColor,
    currentTool,
    setCurrentTool,
    width,
    setWidth,
    handleCursorChange,
    setEraserColor,
    isStroke,
    setIsStroke,
    isColorRainbow,
    setIsColorRainbow,
    isNyanCat,
    setIsNyanCat,
    setNyanCatValues,
  } = props;

  function GithubLinkWithIcon() {
    const gitUrl = "https://github.com/aleksns";

    const openInNewTab = () => {
      const newWindow = window.open(gitUrl, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    };

    return (
      <div className="git-link-box">
        <Link
          className={classes.gitLink}
          component="button"
          underline="disabled"
          onClick={openInNewTab}
        >
          <img src={GitLogo} className={classes.gitLogo}></img>Github: Aleksns
        </Link>
      </div>
    );
  }

  return (
    <>
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
        setCurrentTool={setCurrentTool}
        width={width}
        setWidth={setWidth}
        handleCursorChange={handleCursorChange}
        setEraserColor={setEraserColor}
        isStroke={isStroke}
        setIsStroke={setIsStroke}
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
        setCurrentTool={setCurrentTool}
        isColorRainbow={isColorRainbow}
        setIsColorRainbow={setIsColorRainbow}
        isNyanCat={isNyanCat}
      />
      <GithubLinkWithIcon />
    </>
  );
}
