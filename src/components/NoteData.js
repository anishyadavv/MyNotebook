import React, { useContext, useEffect, useState } from "react";
import AutoLinkText from "./Autolink";
import noteContext from "../context/notes/noteContext";

const NoteData = (note) => {
  const [title, setTitle] = useState(note.title);
  const [tag, setTag] = useState(note.tag);
  const [description, setDescription] = useState(note.description);

  const context = useContext(noteContext);
  const { editNote, setEditNote, noteedit, editNoteid } = context;
  const closepopup = async () => {
    note.setShowNotes(false);

    console.log(noteedit);
    if (note.title !== noteedit.etitle || note.tag !== noteedit.etag || note.description !== noteedit.edescription) {
      await editNote(note.id);
      console.log(noteedit);
    }
  };
  const handleChange = (e) => {
    setEditNote({ ...noteedit, [e.target.name]: e.target.value });
  };
  const date = new Date(note.date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  useEffect(() => {
    setEditNote({
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  }, []);
  return (
    <>
      <div className="blurbackground" onClick={closepopup}></div>
      <div className="note-data">
        <i
          className="fa-solid fa-xmark fa-lg d-flex flex-row-reverse cross"
          onClick={closepopup}
        ></i>
        <h1>
          <input
            className="note-data-title"
            type="text"
            name="etitle"
            value={noteedit.etitle}
            onChange={handleChange}
            style={{ fontWeight: 500 }}
          />
        </h1>
        <textarea
          className="noteDescription"
          id="description"
          name="edescription"
          value={noteedit.edescription}
          onChange={handleChange}
        />
        {/* <AutoLinkText text={note.description} /> */}

        <div className="notedata d-flex align-content-center justify-content-between">
          <input
            type="text"
            className="note-data-tag"
            name="etag"
            value={noteedit.etag}
            onChange={handleChange}
            style={{ fontWeight: 700 }}
          />
          <p className="notedata-date">{`${date.getDate()} ${month} ${date.getFullYear()}`}</p>
        </div>
      </div>
    </>
  );
};

export default NoteData;
