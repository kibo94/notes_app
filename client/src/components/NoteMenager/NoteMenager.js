import React,{ useContext } from 'react';
import NewNote from "../Notes/NewNote/NewNote";
import Sort from "../Sort/Sort";
import Notes from "../Notes/Notes";
import CreateNoteModal from "../UI/CreateNoteModal/CreateNoteModal";
import "./NoteMenager.css";
import { NotesContext } from '../../context';
import SeatchNotes from '../Notes/SearchNotes/SearchNotes';
const NoteMenager = ({notes , saveToDrafts,
  sortByDateBtn,
  }) => {

const { state } = useContext(NotesContext);
let createNoteModal = null;
// Check does create modal open
  if(state.modal){
    createNoteModal = <CreateNoteModal saveToDrafts={saveToDrafts} />
   }
    return (
        <div>
        <SeatchNotes />
        { createNoteModal }
            <div className="ButtonsGroup">
                <NewNote  />
                <Sort sortByDateBtn={ sortByDateBtn } />
            </div>
            <Notes  
            notes={ notes } />
            
        </div>
    );
}
export default NoteMenager;
