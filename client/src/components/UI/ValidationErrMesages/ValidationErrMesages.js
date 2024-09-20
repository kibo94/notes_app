import React from 'react'
import "./error.css"
function ValidationErrMesages({errMessages}) {
    
    return (
        <div className="messages" style={{display:errMessages.length > 0 ? "block" : "none"}}>
        {errMessages.length > 0 
        ? errMessages.map((msg ,i) => <p className="text-danger"  key ={i} >{msg}</p>)
        : null}
            </div>
    )
}

export default ValidationErrMesages
