import React from 'react'

function CreateNoteForm({setNotesFormInputs,finishAddNote,saveToDrafts,singleNote , user}) {
    return (
        <form>
        <div className="form-group">
          <label >Note Title</label>
          <input type="text" className="form-control" placeholder="Enter Note Title" name="title"  onChange={setNotesFormInputs}/>
        
        </div>
        <div className="form-group">
          <label>Note  Body</label>
          <textarea  className="form-control"  placeholder="Enter Note Body" name="body"  onChange={setNotesFormInputs}/>
        </div>
      
        <div className="form-group">
        <label >Note Author Name</label>
        <input disabled={user.auth ? true : false}  className="form-control" placeholder={user.auth ? user.name : "Enter Note Author Name"} name="author__name" onChange={setNotesFormInputs}/>
      </div>
      <div className="modalButtons">
      <button   className="btn btn-primary" onClick={(e) => finishAddNote(e,singleNote)} >Publish</button>
      <button className="ml-2 btn btn-warning" onClick={(e) => saveToDrafts(e,singleNote)} >Save Note to Drafts</button>
      </div>
      
      </form>
    )
}

export default CreateNoteForm
