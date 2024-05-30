import React, { useEffect, useState } from "react";
import { editNote } from "../features/notes/notesSlice";
import { useDispatch } from "react-redux";
import NoteDataDescription from "./NoteDataDescription";

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

  const updatedAt = new Date(note.updatedAt);
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
        <h3>
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
        </h3>
        {/* <textarea
          className="noteDescription"
          placeholder="Description"
          id="description"
          name="description"
          value={NoteData.description}
          onChange={handleChange}
        /> */}
        <NoteDataDescription
          description={NoteData.description}
          onChange={handleChange}
        ></NoteDataDescription>

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
          <p className="notedata-date">
            {note.updatedAt
              ? `Edited ${updatedAt.getDate()} ${
                  months[updatedAt.getMonth()]
                } ${updatedAt.getFullYear()} `
              : `${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
          </p>
        </div>
      </div>
    </>
  );
};

export default NoteData;
