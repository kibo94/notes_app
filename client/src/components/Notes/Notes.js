import React from 'react';
import { getNotesByType } from '../../utilys/getNotesByType';
import Note from "./Note/Note";
import "./Notes.css";
const Notes = (props) => {
    let { removeNoteHandler, editNoteHandler, notes } = props;
    let publishedNotes = null;
    if (notes.length > 0) {
        publishedNotes = getNotesByType(notes, "published");
    }


    return (
        <div className="text-center container notes">
            <div className="row">
                {publishedNotes ? publishedNotes.map(note => (
                    <Note
                        removeNoteHandler={removeNoteHandler}
                        editNoteHandler={editNoteHandler}
                        note={note}
                        key={note.id}
                        notes={publishedNotes}
                        title={note.title}
                        body={note.body}
                        author_name={note.author__name}
                        id={note.id} />)) : <h1></h1>}
            </div>
        </div>
    );
}

export default Notes;
