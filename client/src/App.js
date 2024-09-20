import React, { useContext, useEffect } from 'react';
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer"
import NoteMenager from "./components/NoteMenager/NoteMenager";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Drafts from "./components/Drafts/Drafts";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import EditNote from './components/Notes/EditNote/EditNote';
import Alert from './components/UI/Alert/Alert';
import axios from "./utilys/axios";
import { path } from "./utilys/path"
import { io } from "socket.io-client";
import { NotesContext } from './context';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  const { state, dispatch } = useContext(NotesContext);
  const notes = state.notes.data;
  const socket = io(path)
  useEffect(() => {
    axios.get("/users").then((data) => {
      console.log(data)
      dispatch({ type: "SET__USERS", payload: data.data.users })
    })
  }, [dispatch])
  useEffect(() => {
    axios.get("/notes").then(data => {
      dispatch({ type: "FETCH__NOTES__SUCCESS", payload: data.data })
    }).catch(err => dispatch({ type: "FETCH__NOTES__ERROR", payload: err.message }))
  }, [dispatch])


  useEffect(() => {
    socket.on("updateNote", data => {
      console.log(data)
      dispatch({ type: "SET__NOTES", payload: data.notes[0] })
    })
    socket.on("addNote", data => {
      dispatch({ type: "SET__NOTES", payload: data.notes[0] })
    })
  }, [state.notes])

  const sortByDateBtn = () => {

    let sortedNotes = notes.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    dispatch({ type: "SET__NOTES", payload: sortedNotes })
  }

  const publish = (draft) => {
    let cloneNotes = [...state.notes.data];
    let draftIndex = cloneNotes.findIndex(note => note.id === draft.id);
    let matchDraft = cloneNotes[draftIndex];
    matchDraft.status = "published";
    cloneNotes[draftIndex] = matchDraft;

    axios.post("/notes", cloneNotes).then(data => {
      console.log(data)
      dispatch({ type: "SET__NOTES", payload: data.data.notes })
      socket.emit("addNote", { notes: [data.data.notes], title: matchDraft.title })
    })

  }
  return (
    <BrowserRouter>
      <div className="App">
        <Alert alert={state.alert} />
        <Header />
        <NavBar
          dispatch={dispatch}
          state={state}
          user={state.user} />
      </div>
      <Route path="/" exact render={() =>
        <NoteMenager
          user={state.user}
          notes={notes}
          sortByDateBtn={sortByDateBtn}

        />} />
      <Route path="/drafts" render={() => <Drafts publish={publish} notes={notes} />} />
      <Route path="/note/:id" render={() => <EditNote notes={notes}
      />} />
      <Footer />
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
    </BrowserRouter>

  );
}
export default App;
