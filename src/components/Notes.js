import React , {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import EditNote from './EditNote';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const {notes,getNotes,showpopup,setpopup,setEditNote,setEditNoteid,refresh} = context;
    const editNote = (id,currentNote)=>{
      setpopup(true);
      setEditNoteid(id);
      setEditNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{
        navigate('/login');
      }
      
    },[refresh])
  return (
    <>
    <AddNote/>
    {showpopup && <EditNote/>}
    <div className="container">
        <div className="row my-3">
            <h2>Your Notes</h2>

            {notes.length === 0 && <h1 className='text-center'>No Notes to display</h1>}
            {notes.map((e)=>{
                return <NoteItem key={e._id} editNote = {()=>editNote(e._id,e)} note={e}/>
            })}
        </div>
    </div>
    </>
    
  )
}

export default Notes
