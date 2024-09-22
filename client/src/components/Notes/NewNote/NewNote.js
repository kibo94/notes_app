import React, { useContext } from 'react';
import { NotesContext } from '../../../context';
import "./NewNote.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NewNote = () => {
    const { dispatch, state } = useContext(NotesContext);
    const history = useHistory();
    const toogleNewNoteModal = () => {
        if (state.user.name !== "") {

            dispatch({ type: "TOOGLE__ADD__NOTE__MODAL" })
        }

        else {
            history.push("/login")
        }
    }
    return (
        <button className="NewNoteBtn" onClick={toogleNewNoteModal}>
            <i className="fa fa-plus mr-1"></i>New Note
        </button>
    );
}

export default NewNote;
