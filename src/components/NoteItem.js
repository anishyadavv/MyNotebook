import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote} = context;
    const {note,editNote} = props;

    
  return (
    <div className='col-md-3 m-3'>
        <div className="card" style={{width:"18rem"}}>
            <div className="card-body">
                <div className="d-flex align-items-center">
                  <h5 className="card-title">{note.title}</h5>
                  <i className="fa-solid fa-trash mx-2" onClick={()=>deleteNote(note._id)}></i>
                  <i className="fa-sharp fa-solid fa-file-pen mx-2" onClick={()=>editNote(note._id)}></i>
                </div>
                <p className="card-text">{note.description}</p>
                <p><b>{note.tag}</b></p>
            </div>  
        </div>
    </div>
  )
}

export default NoteItem
