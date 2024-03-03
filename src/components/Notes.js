import React, { Suspense, lazy,useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../features/notes/notesSlice";
import { getUserData } from "../features/user/userSlice";
import { setNoteToBeEdited } from "../features/notes/notesSlice";
import { setFilteredNotes } from "../features/notes/notesSlice";
const EditNote = lazy(() => import("./EditNote"));
const AddNote = lazy(() => import("./AddNote"));

const Notes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const filterednotes = useSelector((state) => state.notes.filteredNotes);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);

  const pinnedNotes = notes.filter((note) => {
    return note.pinned === true;
  });
  const unpinnedNotes = notes.filter((note) => {
    return note.pinned !== true;
  });
  const [search, setSearch] = useState("");
  const editNote = (id, currentNote) => {
    setShowEditNote(true);
    const editNoteData = {
      id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    };
    dispatch(setNoteToBeEdited(editNoteData));
  };
  const handleAddnote = () => {
    setShowAddNote(true);
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
    dispatch(setFilteredNotes(newNotes));
    setSearch(searchValue);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getNotes());
      dispatch(getUserData());
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="notes">
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
            placeholder="Search Here"
            autoComplete="off"
            onChange={handleSearch}
          />
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        {showAddNote && <AddNote setShowAddNote={setShowAddNote} />}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {showEditNote && <EditNote setShowEditNote={setShowEditNote} />}
      </Suspense>

      <div className="container">
        <div className="row my-3">
          <h2 className="mb-4">Your Notes</h2>
          {/* pinned notes  */}
          {pinnedNotes &&
            search.length === 0 &&
            pinnedNotes
              .map((e) => {
                return (
                  <NoteItem
                    key={e._id}
                    editNote={() => editNote(e._id, e)}
                    note={e}
                  />
                );
              })
              .reverse()}
          {/* pinned notes and filtered */}
          {notes.length !== 0 ? (
            search.length === 0 ? (
              unpinnedNotes
                .map((e) => {
                  return (
                    <NoteItem
                      key={e._id}
                      editNote={() => editNote(e._id, e)}
                      note={e}
                    />
                  );
                })
                .reverse()
            ) : filterednotes.length === 0 ? (
              <h1 className="text-center">Note Not Found!</h1>
            ) : (
              filterednotes
                .map((e) => {
                  return (
                    <NoteItem
                      key={e._id}
                      editNote={() => editNote(e._id, e)}
                      note={e}
                    />
                  );
                })
                .reverse()
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
