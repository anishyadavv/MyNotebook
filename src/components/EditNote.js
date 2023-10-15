import React, { useContext} from "react";
import noteContext from "../context/notes/noteContext";

const EditNote = () => {
    const context = useContext(noteContext);
    const {setpopup,editNote,setEditNote,noteedit,editNoteid,setProgress} = context;
    
    
    const closepopup =()=>{
        setpopup(false);
    }

    const handleChange=(e)=>{
        setEditNote({...noteedit,[e.target.name]:e.target.value})
    }

    const handleClick =async(e)=>{
        e.preventDefault();
        setProgress(70);
        await editNote(editNoteid);
        setpopup(false);
        setProgress(100);
        
    }
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
              id="etitle"
              name="etitle"
              value={noteedit.etitle}
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
              id="edescription"
              name="edescription"
              value={noteedit.edescription}
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
              id="etag"
              name="etag"
              value={noteedit.etag}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <button
            disabled={
              noteedit.etitle.length < 5 || noteedit.edescription.length < 5
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
