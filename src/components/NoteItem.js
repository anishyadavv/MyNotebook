import React from 'react'

const NoteItem = (props) => {
    const {note} = props;
  return (
    <div className='col-md-3 m-3'>
        <div className="card" style={{width:"18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p><b>{note.tag}</b></p>
                <i class="fa-solid fa-trash"></i>
                <i class="fa-sharp fa-solid fa-file-pen"></i>
            </div>  
        </div>
    </div>
  )
}

export default NoteItem
