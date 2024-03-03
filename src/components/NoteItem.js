import React, { Suspense, lazy, useState } from "react";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, pinNotes,unpinNotes, setDeleteNoteId } from "../features/notes/notesSlice";

const NoteData = lazy(() => import("./NoteData"));

const NoteItem = (props) => {
  const dispatch = useDispatch();
  const deleteId = useSelector((state) => state.notes.deleteNoteId);
  const [pinned] = useState(props.note.pinned);
  const [showNotes, setShowNotes] = useState(false);
  const { note, editNote } = props;
  const showpopup = (e, id) => {
    e.preventDefault();
    document.querySelector(".popup").style.display = "block";
    document.querySelector(".blurbackground").style.display = "block";
    dispatch(setDeleteNoteId(id));
  };
  const closepopup = () => {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".blurbackground").style.display = "none";
  };
  const handleYes = async (e) => {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".blurbackground").style.display = "none";
    dispatch(deleteNote(deleteId));
  };
  const handleClick = () => {
    setShowNotes(true);
  };
  const handlepinned = async () => {
    dispatch(pinNotes(props.note._id));
  };
  const handleunpinned = async () => {
    dispatch(unpinNotes(props.note._id));
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
      <Suspense fallback={<Spinner />}>
        {showNotes && (
          <NoteData
            title={note.title}
            description={note.description}
            tag={note.tag}
            date={date}
            id={note._id}
            setShowNotes={setShowNotes}
          />
        )}
      </Suspense>

      <div className="col-lg-4 col-md-6">
        <div className="card mb-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">
                {note.title.length > 12
                  ? note.title.slice(0, 12) + "..."
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
                  onClick={(e) => showpopup(e, note._id)}
                ></i>
                <i
                  className="fa-sharp fa-solid fa-file-pen ms-2"
                  onClick={() => editNote(note._id)}
                ></i>
              </div>
            </div>
            <p
              className="card-text"
              style={{ whiteSpace: "pre-wrap" }}
              onClick={handleClick}
            >
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
