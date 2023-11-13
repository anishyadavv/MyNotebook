import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);
  const [filterednotes, setFilterednotes] = useState([]);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [loading, setLoading] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [userData, setUserData] = useState({ name: null, email: null });
  const [noteedit, setEditNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [editNoteid, setEditNoteid] = useState();
  const [showpopup, setpopup] = useState(false);
  const [showAddnote, setAddnote] = useState(false);
  const [alert, setAlert] = useState("");
  const [progress, setProgress] = useState(0);
  const host = "http://localhost:5000";

  //show alert
  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 1200);
  };

  //fetch notes
  const getNotes = async () => {
    setProgress(90);
    const response = await fetch(`${host}/api/notes/fetchAllnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
    setProgress(100);
  };

  // add a note
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));

    showAlert("Note is Added");
  };
  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    const filteredNotes = filterednotes.filter((note) => {
      return note._id !== id;
    });
    setFilterednotes(filteredNotes);
    setNotes(newNotes);

    showAlert("Note Deleted");
  };

  // edit a note
  const editNote = async (id) => {
    setProgress(0);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: noteedit.etitle,
        description: noteedit.edescription,
        tag: noteedit.etag,
      }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = noteedit.etitle;
        newNotes[index].description = noteedit.edescription;
        newNotes[index].tag = noteedit.etag;
        break;
      }
    }
    for (let index = 0; index < filterednotes.length; index++) {
      const element = filterednotes[index];
      if (element._id === id) {
        element.title = noteedit.etitle;
        element.description = noteedit.edescription;
        element.tag = noteedit.etag;
        break;
      }
    }

    setNotes(newNotes);
    setProgress(100);
    showAlert("Note Updated");
  };
  // get userdata
  const getUserData = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUserData({ name: json.name, email: json.email });
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        showpopup,
        setpopup,
        note,
        setNote,
        noteedit,
        setEditNote,
        editNoteid,
        setEditNoteid,
        alert,
        setAlert,
        showAlert,
        loading,
        setLoading,
        getUserData,
        userData,
        setUserData,
        deleteId,
        setDeleteId,
        showAddnote,
        setAddnote,
        showNotes,
        setShowNotes,
        filterednotes,
        setFilterednotes,
        progress,
        setProgress,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
