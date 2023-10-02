import React, { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteData from "./NoteData";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, deleteId, setDeleteId,setProgress } = context;
  const [showNotes,setShowNotes] = useState(false);
  const { note, editNote } = props;
  const showpopup=(id)=>{
    document.querySelector('.popup').style.display = 'block';
    setDeleteId(id)
  }
  const closepopup=()=>{
    document.querySelector('.popup').style.display = 'none';
  }
  const handleYes =(e)=>{
    document.querySelector('.popup').style.display = 'none';
    setProgress(0);
    deleteNote(deleteId);
    setProgress(100);
  }
  const handleClick =()=>{
    setShowNotes(true);
  }
  return (
    <>
      {showNotes && (
        <NoteData
          title={note.title}
          description={note.description}
          tag={note.tag}
          setShowNotes={setShowNotes}
        />
      )}
      <div className="col-lg-4 col-md-6">
        <div className="card mb-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">{note.title}</h5>
              <div>
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
            <p className="card-text">
              {note.description.length > 120
                ? note.description.slice(0, 120) + "...."
                : note.description}
            </p>
            <p>
              <b>{note.tag}</b>
            </p>
          </div>
        </div>
      </div>
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
