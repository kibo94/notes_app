import React, { useContext } from 'react';
import { NotesContext } from '../../../context';
import "./Filter.css";
import axios from "../../../utilys/axios";
const Filter = () => {
  const {dispatch} = useContext(NotesContext);
  
  const filterInputValue = (e) => {
    let enteredInputValue = e.target.value
      axios.get(`/notes/filter/?word=${enteredInputValue}`).then(data => {
        dispatch({type:"SET__NOTES" , payload:data.data.notes})
      })
  
  }
    return (  
        <div className="form-group Filter">
          <input 
            type="text"
            className="form-control" 
            placeholder="Search Notes..." name="title"  
            onChange={filterInputValue}/>
            <i className='fa fa-search'></i>
      </div>  
        
    );
}

export default Filter;
