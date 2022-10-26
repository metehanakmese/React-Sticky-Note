import React, { useContext, useState } from "react";
import MainContext from "../../MainContext";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

function NoteBox() {
  const { boxPosition, setMode, notes, setNotes, setBoxVisible } =
    useContext(MainContext);
  const types = [
    {
      name: "comment",
      color: "#ff1493",
      text: "Comment",
    },
    {
      name: "private-comment",
      color: "#969BAB",
      text: "Private Comment",
    },
    {
      name: "note",
      color: "#FFC038",
      text: "Note",
    },
  ];

  const [color, setColor] = useState(types[0].color);
  const [note, setNote] = useState("");
  const changeColor = (e) => {
    setColor(e.target.value);
  };
  console.log(note);

  const addNote = () => {
    const currentNote = {
      id: uuidv4(),
      number: notes.length + 1,
      note,
      color,
      position: {
        x: boxPosition.x,
        y: boxPosition.y,
      },
    };
    setNotes([...notes, currentNote]);
    setBoxVisible(false);
    setMode(true);
  };

  return (
    <div
      className="note-box"
      onMouseEnter={() => setMode(false)}
      onMouseLeave={() => setMode(true)}
      style={{
        "--color": color,
        position: "absolute",
        top: boxPosition.y,
        left: boxPosition.x,
      }}
    >
      <span className="note-box-number">{notes.length + 1}</span>

      <select onChange={changeColor}>
        {types.map((type) => (
          <option value={type.color}>{type.text}</option>
        ))}
      </select>

      <textarea
        onChange={(e) => setNote(e.target.value)}
        placeholder="Your Note..."
        cols="30"
        rows="5"
      ></textarea>

      <button onClick={addNote} disabled={!note}>
        Send
      </button>
    </div>
  );
}

export default NoteBox;
