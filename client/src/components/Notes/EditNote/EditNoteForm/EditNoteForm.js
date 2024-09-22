import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { NotesContext } from '../../../../context';
import valid from '../../../../utilys/validation';
import axios from "../../../../utilys/axios"
import ValidationErrMesages from '../../../UI/ValidationErrMesages/ValidationErrMesages';
import "../EditNote.css";

import { path } from '../../../../utilys/path';
const socket = path

function EditNoteForm({ singleNote, updateNoteInput }) {

    const { state, dispatch } = useContext(NotesContext);
    const history = useHistory();
    if (!singleNote) {
        history.push("/")
    }

    const updateNoteHandler = (singleNote) => {
        let { title, author__name, body } = singleNote;
        if (valid(title, author__name, body).valid) {
            axios.put("/notes", singleNote).then((data) => {

                dispatch({ type: "SET__NOTES", payload: data.data.notes });
                socket.emit("updateNote", { notes: [data.data.notes], title });
                dispatch({ type: "SET__ALERT", payload: { active: true, msg: `The note ${title} is updated`, color: "orange" } })
                setTimeout(() => dispatch({ type: "CLEAR__ALERT" }), 3000);
            })

            history.push("/");
        }
        else {
            dispatch({ type: "SET__VALIDATION__ERRORS", payload: valid(title, author__name, body).messages });
        }
    }
    return (
        <div className="EditWrapper">
            {singleNote ?
                <>
                    <label>Title</label>
                    <input value={singleNote.title} onChange={updateNoteInput} name="title" />
                    <label>Body</label>
                    <textarea value={singleNote.body} onChange={updateNoteInput} name="body" />
                    <label>Author</label>
                    <input value={singleNote.author__name} onChange={updateNoteInput} name="author__name" />
                    <button onClick={() => updateNoteHandler(singleNote)} className="mt-2 btn btn-success">Update Note</button>
                    <ValidationErrMesages errMessages={state.errMessages} />
                </> : null}
        </div>



    )
}

export default EditNoteForm
