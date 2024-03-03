import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useDispatch, useSelector } from "react-redux";
import { editNote } from "../features/notes/notesSlice";

const EditNote = () => {
  const context = useContext(noteContext);
  const dispatch = useDispatch();
  const noteToBeEdited = useSelector((state) => state.notes.noteToBeEdited);
  const [NoteData, setNoteData] = useState(noteToBeEdited);
  const { setpopup, setProgress } =
    context;

  const closepopup = () => {
    setpopup(false);
  };

  const handleChange = (e) => {
    setNoteData({ ...NoteData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setProgress(70);
    dispatch(editNote(NoteData));
    setpopup(false);
    setProgress(100);
  };
  return (
    <div>
      <div className="blurbackground" onClick={closepopup}></div>
      <div className=" addnote container my-5">
        <i
          className="fa-solid fa-xmark fa-lg d-flex flex-row-reverse"
          onClick={closepopup}
        ></i>
        <h2>Edit Notes</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={NoteData.title}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={NoteData.description}
              onChange={handleChange}
              autoComplete="off"
              rows={5}
            />
          </div>
          <div className="mb-3">
            <label className="tag" htmlFor="exampleCheck1">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={NoteData.tag}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <button
            disabled={
              NoteData.title.length < 5 || NoteData.description.length < 5
            }
            type="submit"
            onClick={handleClick}
            className="btn btn-dark btn-form"
          >
            Edit Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
