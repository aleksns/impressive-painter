import React from "react";
import "../App.css";
import GitLogo from "../images/github-icon.png";

export default function GithubLinkWithIcon() {
  const gitUrl = "https://github.com/aleksns";

  const openInNewTab = () => {
    const newWindow = window.open(gitUrl, "_blank", "noopener noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="container-git-link">
	      <a
        className="git-link"
        underline="none"
        onClick={openInNewTab}
      >
<img src={GitLogo} className="git-logo"></img>Github: Aleksns
      </a>
    </div>
  );
}
