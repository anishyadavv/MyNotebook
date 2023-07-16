import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
  return (
    <div className="container">
        <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.map((e)=>{
                return <NoteItem note={e}/>
            })}
        </div>
    </div>
    
  )
}

export default Notes
