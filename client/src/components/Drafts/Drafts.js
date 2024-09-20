import React from 'react';
import "./Drafts.css"
import { getNotesByType } from '../../utilys/getNotesByType';
const Drafts = (props) => {
  let { notes, publish } = props;
  let draftNotes = null
  if (notes.length > 0) {
    draftNotes = getNotesByType(notes, "drafts")
  };
  let emptyDrafts = null;
  // Check empty drafts
  if (draftNotes && draftNotes.length === 0) {
    emptyDrafts = <h1 className="text-center">Emty Drafts</h1>
  }
  return (
    <div className="container Drafts">
      {emptyDrafts}
      <div className="row">
        {draftNotes && draftNotes.length > 0 ? draftNotes.map(draft => (
          <div className="card  text-center col-lg-4  " key={draft.id}>
            <div className="card-body">
              <h2 className="card-title">{draft.title}</h2>
              <p className="card-text">{draft.body}</p>
              <h3 className="card-subtitle mb-2 text-muted">{draft.author_name}</h3>
              <button className="btn btn-primary" onClick={() => publish(draft)} >Publish</button>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
}

export default Drafts;
