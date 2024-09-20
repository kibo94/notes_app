import React  from 'react';
import "./Sort.css"

const Sort = ({sortByDateBtn}) => {

     console.log("sort render")
    return (
         <button className="btn btn-success" onClick={sortByDateBtn}>
              <i className="mr-1 fa fa-sort"></i>
               SortByDate
          </button>
    );
}

export default Sort;
