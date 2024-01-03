import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteData from "./NoteData";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, deleteId, setDeleteId, setProgress, pinNotes,unpinNotes} = context;
  const [pinned,setPinned] = useState(props.note.pinned);
  const [showNotes, setShowNotes] = useState(false);
  const { note, editNote } = props;
  const showpopup = (id) => {
    document.querySelector(".popup").style.display = "block";
    document.querySelector(".blurbackground").style.display = "block";
    setDeleteId(id);
  };
  const closepopup = () => {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".blurbackground").style.display = "none";
  };
  const handleYes = async (e) => {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".blurbackground").style.display = "none";
    setProgress(70);
    await deleteNote(deleteId);
    setProgress(100);
  };
  const handleClick = () => {
    setShowNotes(true);
  };
  const handlepinned = async()=>{
    await pinNotes(props.note._id);
    setProgress(100);
  }
  const handleunpinned = async()=>{
    await unpinNotes(props.note._id);
    setProgress(100);
  }
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
      {showNotes && (
        <NoteData
          title={note.title}
          description={note.description}
          tag={note.tag}
          date={date}
          setShowNotes={setShowNotes}
        />
      )}
      <div className="col-lg-4 col-md-6">
        <div className="card mb-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">
                {note.title.length > 14
                  ? note.title.slice(0, 14) + "..."
                  : note.title}
              </h5>
              <div>
                {pinned ? (
                  <i
                    className="fa-solid fa-thumbtack me-2"
                    onClick={handleunpinned}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-thumbtack me-2"
                    style={{ color: "gray" }}
                    onClick={handlepinned}
                  ></i>
                )}
                <i
                  className="fa-solid fa-trash mx-2"
                  onClick={() => showpopup(note._id)}
                ></i>
                <i
                  className="fa-sharp fa-solid fa-file-pen mx-2"
                  onClick={() => editNote(note._id)}
                ></i>
                <i className="fa-solid fa-expand" onClick={handleClick}></i>
              </div>
            </div>
            <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
              {note.description.length > 90
                ? note.description.slice(0, 90) + "...."
                : note.description}
            </p>
            <p className="card-tag">
              <b>{note.tag}</b>
            </p>
            <p className="time">{`${date.getDate()} ${month.slice(
              0,
              3
            )} ${date.getFullYear()}`}</p>
          </div>
        </div>
      </div>
      <div
        className="blurbackground"
        onClick={closepopup}
        style={{ display: "none" }}
      ></div>
      <div className="popup shadow">
        <p className="text-center">Are you sure?</p>
        <div className="d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={closepopup}
          >
            NO
          </button>
          <button
            type="button"
            className="btn btn-dark mx-2"
            onClick={handleYes}
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
