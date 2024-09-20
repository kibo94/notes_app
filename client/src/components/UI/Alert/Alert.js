import React  from 'react';

import "./Alert.css";

function Alert({alert : { active, color, msg}}) {
    let alert =  active ? <div className="Alert" style={{color:color}}> {msg}</div>  : null
    return (
        <React.Fragment>
            {alert}
        </React.Fragment>  
   )
    
    }
export default Alert
