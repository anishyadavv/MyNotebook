import React, { useState } from "react";
import { addNote } from "../features/notes/notesSlice";
import { useDispatch } from "react-redux";
const AddNote = ({setShowAddNote}) => {
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const closepopup = () => {
    setShowAddNote(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(addNote(note));
    setShowAddNote(false);
  };
  return (
    <>
      <div className="blurbackground" onClick={closepopup}></div>
      <div className=" addnote container my-5">
        <i
          className="fa-solid fa-xmark fa-lg d-flex flex-row-reverse"
          onClick={closepopup}
        ></i>
        <h2>Add Notes</h2>
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
              value={note.title}
              onChange={handleChange}
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
              value={note.description}
              onChange={handleChange}
              rows={4}
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
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            onClick={handleClick}
            className="btn btn-dark btn-form"
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
