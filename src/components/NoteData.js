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
          <AutoLinkText text ={note.description}/>
        </p>
        <b className="notedata-tag">{note.tag}</b>
        <p className="time">{`${date.getDate()} ${month} ${date.getFullYear()}`}</p>
      </div>
    </>
  );
};

export default NoteData;
