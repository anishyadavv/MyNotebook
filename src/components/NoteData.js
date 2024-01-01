import React from "react";
import AutoLinkText from "./Autolink"

const NoteData = (note) => {

  const closepopup = async () => {
    note.setShowNotes(false);
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
  return (
    <>
      <div className="blurbackground" onClick={closepopup}></div>
      <div className="note-data">
        <i
          className="fa-solid fa-xmark fa-lg d-flex flex-row-reverse cross"
          onClick={closepopup}
        ></i>
        <h1>{note.title}</h1>
        <p className="noteDescription" id="description">
          <AutoLinkText text={note.description} />
        </p>
        <div className="notedata d-flex align-content-center justify-content-between">
          <b>{note.tag}</b>
          <p className="notedata-date">{`${date.getDate()} ${month} ${date.getFullYear()}`}</p>
        </div>
      </div>
    </>
  );
};

export default NoteData;
