import { useEffect, useRef, useState } from "react";
import "./App.css";
import calendar from "./calendar.PNG";
import LeaveCommentText from "./components/LeaveCommentText/LeaveCommentText";
import Note from "./components/Note/Note";
import NoteBox from "./components/NoteBox/NoteBox";
import Notification from "./components/Notification/Notification";
import MainContext from "./MainContext";

function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [boxVisible, setBoxVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [notes, setNotes] = useState(
    (localStorage.notes && JSON.parse(localStorage.notes)) || []
  );

  useEffect(() => {
    screen.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    let timer1 = setTimeout(() => setShowNotification(true), 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [showNotification]);

  const handleKeyUp = (e) => {
    if (e.key === "c") {
      setMode(!mode);
      setBoxVisible(false);
    }
    if (e.key === "Escape") {
      setBoxVisible(false);
    }
  };

  const handleMouseMove = (e) => {
    setPosition({
      x: [e.pageX, e.clientX],
      y: [e.pageY, e.clientY],
    });
  };
  const handleClick = (e) => {
    if (mode) {
      setBoxPosition({
        x: position.x[0],
        y: position.y[0],
      });
      setBoxVisible(true);
    }
  };

  const data = {
    position,
    boxPosition,
    mode,
    setMode,
    notes,
    setNotes,
    setBoxVisible,
  };

  return (
    <MainContext.Provider value={data}>
      <div
        ref={screen}
        tabIndex={0}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onKeyUp={handleKeyUp}
        className={`screen ${mode && " editable"}`}
      >
        <img style={{ opacity: ".5" }} src={calendar} alt="" />

        {mode && <LeaveCommentText />}

        {notes && notes.map((note, i) => <Note key={i} {...note} />)}
        {boxVisible && <NoteBox />}
        {showNotification && <Notification />}

        <div className="sticky-bar">
          <button
            onClick={() => setMode(!mode)}
            className={mode ? "active" : ""}
          >
            Comment Mode <code>c</code>
          </button>
          {boxVisible && (
            <button onClick={() => setBoxVisible(false)} className="active">
              Close <code>Esc</code>
            </button>
          )}
        </div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
