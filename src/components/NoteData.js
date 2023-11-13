import React from "react";


const NoteData = (note) => {
     const closepopup = () => {
       note.setShowNotes(false);
     };
  return (
    <>
      <div className="blurbackground" onClick={closepopup}></div>
      <div className="note-data">
        {/* <i
          className="fa-solid fa-xmark fa-lg d-flex flex-row-reverse cross"
          onClick={closepopup}
        ></i> */}
        <h1>{note.title}</h1>
        <p className="noteDescription">{note.description}</p>
        <b>{note.tag}</b>
      </div>
    </>
  );
}

export default NoteData
