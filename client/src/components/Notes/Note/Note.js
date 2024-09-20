import React, { useContext, useEffect } from 'react';
import "./Note.css";
import { useHistory } from 'react-router-dom';
import { NotesContext } from '../../../context';
import axios from "../../../utilys/axios"
import { path } from '../../../utilys/path';
import { io } from 'socket.io-client';
const socket = io(path)
const Note = (props) => {
    const {dispatch} = useContext(NotesContext);
    let { title,body,author_name,id  } = props;
    let history = useHistory();

    useEffect(() => {
        socket.on("deleteNote" , data => {
          dispatch({type:"SET__NOTES" , payload:data.notes[0]})   
        })
      })
    function removeNoteHandler (id,title) {
         axios.delete(`/notes/${id}`).then((data) => {
            dispatch({type:"SET__NOTES" , payload:data.data.notes})
            dispatch({type:"SET__ALERT" , payload:{active:true,msg:`The note ${title} is deleted`,color:"red"}})  
            setTimeout(() =>  dispatch({type:"CLEAR__ALERT"}) ,3000 )
            socket.emit("deleteNote" , {notes:[data.data.notes],title})
         })
         

    }
    const editNoteHandler = (note) => {
        history.push(`/note/${note.id}`)
      
    }
    return (
 <div className="Note col-lg-3 col-md-4 col-sm-6">
          <div className="card">
           <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p className="card-text">{body}</p>
              <h3 className="card-subtitle mb-2 text-muted">{author_name}</h3>
             <button className="w-100 btn btn-danger" onClick={()=>removeNoteHandler(id,title)}>Delete Note</button>
             <button className="w-100 btn btn-warning mt-2 d-block" onClick={() => editNoteHandler(props.note)}>Edit Note</button>
          </div>
                </div>     
                    </div>
        
    );
}

export default Note;
