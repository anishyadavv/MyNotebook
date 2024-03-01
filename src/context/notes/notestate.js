import React, { useState } from "react";
import NoteContext from "./noteContext";
import toast from "react-hot-toast";

const NoteState = (props) => {
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);
  const [filterednotes, setFilterednotes] = useState([]);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [loading, setLoading] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [noteedit, setEditNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [editNoteid, setEditNoteid] = useState();
  const [showpopup, setpopup] = useState(false);
  const [showAddnote, setAddnote] = useState(false);
  const [progress, setProgress] = useState(0);
  const host = "https://mynotebookbackend-0n7e.onrender.com";

  //fetch notes

  // add a note

  //delete a note

  //pin a note
  //unpin a note

  // edit a note
  const editNote = async (id) => {
    setProgress(90);
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
    toast.success("Note Updated");
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        editNote,
        showpopup,
        setpopup,
        note,
        setNote,
        noteedit,
        setEditNote,
        editNoteid,
        setEditNoteid,
        loading,
        setLoading,
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
