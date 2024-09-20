import React from 'react'
import {  useParams  } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm';
import { getSingleNoteById } from '../../../utilys/getSingleNoteById';
import "./EditNote.css";
import EditNoteForm from './EditNoteForm/EditNoteForm';

function EditNote({notes}) {
    const { id } = useParams();
    const [singleNote, updateNoteInput] = useForm(getSingleNoteById(id,notes));
  
    let edit = 
       <div className="Edit">
            <EditNoteForm 
            updateNoteInput={updateNoteInput} 
            singleNote={singleNote} 
            />
        </div>
    return (
        <div>
             {edit}
        </div>
         )
}
export default EditNote