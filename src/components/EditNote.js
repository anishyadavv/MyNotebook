import React, { useContext} from "react";
import noteContext from "../context/notes/noteContext";

const EditNote = () => {
    const context = useContext(noteContext);
    const {setpopup,editNote,setEditNote,noteedit,editNoteid} = context;
    
    
    const handleclose =()=>{
        setpopup(false);
    }

    const handleChange=(e)=>{
        setEditNote({...noteedit,[e.target.name]:e.target.value})

    }

    const handleClick =(e)=>{
        e.preventDefault();
        editNote(editNoteid);
        setpopup(false);
        
    }
  return (
    <div>
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleclose}
              ></button>
            </div>
            <div className="modal-body">    
            <h1>Edit Notes</h1>
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={noteedit.edescription}
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
            id="etag"
            name="etag"
            value={noteedit.etag}
            onChange={handleChange}
          />
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleclose}
              >
                Close
              </button>
              <button disabled={noteedit.etitle.length<5 ||noteedit.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
