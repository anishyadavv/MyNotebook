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
  const [refresh, setRefresh] = useState(false);
  const [editNoteid, setEditNoteid] = useState();
  const [showpopup, setpopup] = useState(false);
  const [showAddnote, setAddnote] = useState(false);
  const [alert, setAlert] = useState("");
  const host = "https://mynotebookbackend-0n7e.onrender.com";

  //show alert
  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 1200);
  };

  //fetch notes
  const getNotes = async () => {
    setLoading(true);
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
    setLoading(false);
    setNotes(json);
  };

  // add a note
  const addNote = async ({ title, description, tag }) => {
    setLoading(true);
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
    refresh ? setRefresh(false) : setRefresh(true);
    setLoading(false);
    showAlert("Note is Added");
  };
  //delete a note
  const deleteNote = async (id) => {
    setLoading(true);
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

    refresh ? setRefresh(false) : setRefresh(true);
    setLoading(false);
    showAlert("Note Deleted");
  };

  // edit a note
  const editNote = async (id) => {
    setLoading(true);
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
    // refresh ? setRefresh(false) : setRefresh(true);
    setLoading(false);
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
        refresh,
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
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
