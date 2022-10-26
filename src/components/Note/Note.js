import React, { useState, useContext } from "react";
import "./styles.css";
import MainContext from "../../MainContext";
import Draggable from "react-draggable";

function Note(note) {
  const { setMode, notes, setNotes } = useContext(MainContext);

  const [visible, setVisible] = useState(false);
  const [clickable, setClickable] = useState(true);

  const showNote = () => {
    if (clickable) {
      setVisible(!visible);
    }
  };

  const setNotePosition = (e, data) => {
    const newNotes = notes.map((n) => {
      if (n.number === note.number) {
        n.position = {
          x: data.x,
          y: data.y,
        };
      }
      return n;
    });
    setNotes(newNotes);
  };

  return (
    <Draggable
      onDrag={() => setClickable(false)}
      onStart={() => setClickable(true)}
      onStop={setNotePosition}
      defaultPosition={{ x: note.position.x, y: note.position.y }}
    >
      <div
        onMouseEnter={() => setMode(false)}
        onMouseLeave={() => setMode(true)}
        className="note-container"
        style={{ "--color": note.color, position: "absolute", top: 0, left: 0 }}
      >
        <span onClick={showNote} className="note-box-number">
          {note.number}
        </span>

        <div className="note" style={{ display: visible ? "flex" : "none" }}>
          {note.note}
        </div>
      </div>
    </Draggable>
  );
}

export default Note;
