import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [noteedit, setEditNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [editNoteid, setEditNoteid] = useState();
  const [showpopup, setpopup] = useState(false);
  const [alert, setAlert] = useState("");
  const host = "https://mynotebookbackend-0n7e.onrender.com";

  //show alert
  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  };

  //fetch notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  // add a note
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    refresh ? setRefresh(false) : setRefresh(true);
    
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
        "auth-token": localStorage.getItem('token')
      },
    });
    refresh ? setRefresh(false) : setRefresh(true);
    showAlert("Note Deleted");
  };

  // edit a note
  const editNote = async (id) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: noteedit.etitle,
        description: noteedit.edescription,
        tag: noteedit.etag,
      }),
    });

    refresh ? setRefresh(false) : setRefresh(true);
    showAlert("Note Updated");
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
        refresh,
        alert, 
        setAlert,
        showAlert
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
