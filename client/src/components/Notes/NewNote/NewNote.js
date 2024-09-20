import React, { useContext }  from 'react';
import { NotesContext } from '../../../context';
import "./NewNote.css"

const NewNote = () => {
    const { dispatch } = useContext(NotesContext);
    const toogleNewNoteModal = () =>  dispatch({type:"TOOGLE__ADD__NOTE__MODAL"})
    return (
            <button className="NewNoteBtn" onClick={toogleNewNoteModal}>
                <i className="fa fa-plus mr-1"></i>New Note
             </button>
    );
}

export default NewNote;
