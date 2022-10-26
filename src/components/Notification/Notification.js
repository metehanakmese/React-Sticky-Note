import React, { useContext } from "react";
import MainContext from "../../MainContext";
import "./styles.css";

function Notification() {
  const { mode } = useContext(MainContext);

  return (
    <div>
      {mode && <div className="notification">Comment mode active !</div>}
      {!mode && <div className="notification">Comment mode inactive !</div>}
    </div>
  );
}

export default Notification;
