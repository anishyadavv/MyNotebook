import React, { useEffect, useState } from "react";
import { editNote } from "../features/notes/notesSlice";
import { useDispatch } from "react-redux";

const NoteData = (note) => {
  const dispatch = useDispatch();
  const [NoteData, setNoteData] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const closepopup = async () => {
    note.setShowNotes(false);
    if (
      note.title !== NoteData.title ||
      note.tag !== NoteData.tag ||
      note.description !== NoteData.description
    ) {
      dispatch(editNote(NoteData));
    }
  };

  const handleChange = (e) => {
    setNoteData({ ...NoteData, [e.target.name]: e.target.value });
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
    setNoteData({
      id: note.id,
      title: note.title,
      description: note.description,
      tag: note.tag,
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
            name="title"
            value={NoteData.title}
            onChange={handleChange}
            style={{ fontWeight: 500 }}
            placeholder="Title"
            autoFocus
          />
        </h1>
        <textarea
          className="noteDescription"
          placeholder="Description"
          id="description"
          name="description"
          value={NoteData.description}
          onChange={handleChange}
        />
        {/* <div className="links">
          <AutoLinkText text={note.description} />
        </div> */}

        <div className="notedata d-flex align-content-center justify-content-between">
          <input
            type="text"
            className="note-data-tag"
            name="tag"
            value={NoteData.tag}
            onChange={handleChange}
            style={{ fontWeight: 700 }}
            placeholder="Tag"
          />
          <p className="notedata-date">{`${date.getDate()} ${month} ${date.getFullYear()}`}</p>
        </div>
      </div>
    </>
  );
};

export default NoteData;
