import React, { useContext, useEffect } from 'react';
import "./Modal.css";
import uuid from "uuid";
import ValidationErrMesages from '../ValidationErrMesages/ValidationErrMesages';
import CreateNoteForm from '../../Notes/CreateNoteForm/CreateNoteForm';
import { useForm } from '../../../hooks/useForm';
import { NotesContext } from '../../../context';
import valid from '../../../utilys/validation';
import axios from "../../../utilys/axios"
import { path } from '../../../utilys/path';
import { io } from 'socket.io-client';
function Modal() {
  const { state, dispatch } = useContext(NotesContext);
  const socket = io(path, { transports: ['polling', 'websocket'] })
  const [singleNote, setSingleNote] = useForm({
    title: "",
    author__name: state.user.auth ? state.user.name : "",
    body: "",
    id: uuid(),
    date: new Date().toLocaleDateString(),

  })
  useEffect(() => {
    dispatch({ type: "SET__VALIDATION__ERRORS", payload: [] })
  }, [])


  function addNote({ e, singleNote, color, msg, active, status }) {
    e.preventDefault();
    singleNote.status = status
    let { title, author__name, body } = singleNote;
    if (valid(title, author__name, body).valid) {
      axios.post("/notes", [...state.notes.data, singleNote]).then(data => {
        dispatch({ type: "SET__NOTES", payload: data.data.notes })
        dispatch({ type: "SET__ALERT", payload: { active, msg, color } })
        dispatch({ type: "TOOGLE__ADD__NOTE__MODAL" })
        setTimeout(() => dispatch({ type: "CLEAR__ALERT" }), 3000)
        socket.emit("addNote", { notes: [data.data.notes], title: singleNote.title })
      })
    }
    else {
      dispatch({ type: "SET__VALIDATION__ERRORS", payload: valid(title, author__name, body).messages })
    }
  }
  const finishAddNote = (e, singleNote) => {
    addNote(
      {
        e,
        singleNote,
        color: "green",
        msg: `The note 
      ${singleNote.title} is created`,
        active: true,
        status: "published"
      }
    )

  }
  function closeModal() {
    dispatch({ type: "TOOGLE__ADD__NOTE__MODAL" })
  }

  function saveToDrafts(e, singleNote) {
    addNote(
      {
        e,
        singleNote,
        color: "blue",
        msg: `The note ${singleNote.title} is move to drafts`,
        active: true,
        status: "drafts"
      })
  }
  return (
    <div className="Modal">
      <p className="text-right text-danger" onClick={closeModal}><i className="fa fa-close"></i></p>
      <CreateNoteForm
        setNotesFormInputs={setSingleNote}
        singleNote={singleNote}
        saveToDrafts={saveToDrafts}
        finishAddNote={finishAddNote}
        user={state.user}
      />
      <ValidationErrMesages errMessages={state.errMessages} />
    </div>
  );
}

export default Modal;
