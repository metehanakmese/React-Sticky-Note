import React, { useContext } from "react";
import MainContext from "../../MainContext";
import "./styles.css";

function LeaveCommentText() {
  const { position } = useContext(MainContext);
  return (
    <div
      className="leave-comment-text"
      style={{
        position: "fixed",
        top: position.y[1],
        left: position.x[1] + 20,
      }}
    >
      Click to leave a comment
    </div>
  );
}

export default LeaveCommentText;
