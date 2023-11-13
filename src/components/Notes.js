import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const EditNote = lazy(() => import("./EditNote"));
const AddNote = lazy(() => import("./AddNote"));
const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {
    notes,
    getNotes,
    showpopup,
    setpopup,
    setEditNote,
    setEditNoteid,
    getUserData,
    showAddnote,
    setAddnote,
    filterednotes,
    setFilterednotes,
  } = context;
  const [search, setSearch] = useState("");
  const editNote = (id, currentNote) => {
    setpopup(true);
    setEditNoteid(id);
    setEditNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleAddnote = () => {
    setAddnote(true);
  };
  const handleSearch = (e) => {
    let searchValue = e.target.value.toLowerCase();
    let newNotes = notes.filter((note) => {
      let title = note.title.toLowerCase();
      let description = note.description.toLowerCase();
      let tag = note.tag.toLowerCase();
      return (
        title.includes(searchValue) ||
        description.includes(searchValue) ||
        tag.includes(searchValue)
      );
    });
    setFilterednotes(newNotes);
    setSearch(searchValue);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
      getUserData();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  },[]);
  return (
    <div className="notes">
      {/* <Alert message="hello" showAlert="hello" /> */}
      <div className="container d-md-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-dark mt-4" onClick={handleAddnote}>
          Add Note
          <i
            className=" mx-1 fa-solid fa-plus"
            style={{ color: "#ffffff" }}
          ></i>
        </button>
        <div className="search mt-4">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className=""
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            autoComplete="off"
            onChange={handleSearch}
          />
        </div>
      </div>
      <Suspense fallback={<Spinner />}>{showAddnote && <AddNote />}</Suspense>
      <Suspense fallback={<Spinner />}>{showpopup && <EditNote />}</Suspense>

      <div className="container">
        <div className="row my-3">
          <h2 className="mb-4">Your Notes</h2>

          {notes.length !== 0 ? (
            search.length === 0 ? (
              notes
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                })
                .map((e) => {
                  return (
                    <NoteItem
                      key={e._id}
                      editNote={() => editNote(e._id, e)}
                      note={e}
                    />
                  );
                })
            ) : filterednotes.length === 0 ? (
              <h1 className="text-center">Note Not Found!</h1>
            ) : (
              filterednotes
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                })
                .map((e) => {
                  return (
                    <NoteItem
                      key={e._id}
                      editNote={() => editNote(e._id, e)}
                      note={e}
                    />
                  );
                })
            )
          ) : (
            <h1 className="text-center">No Notes To Display</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
