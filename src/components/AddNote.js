import React, { useContext} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote,note,setNote} = context;

  
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note);
        setNote({title:"",description:"",tag:""});

    }
  return (
    <div className="container my-5">
      <h1>Add Notes</h1>
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
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
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
        <button disabled={note.title.length<5 ||note.description.length<5} type="submit" onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
