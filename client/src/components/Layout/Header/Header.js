
import React from 'react';
import "./Header.css"
import logo from "../../../assets/logo.png";
const header = () => {
    return (
        <div>
           <header className="Header">
           NOTES APP
            <div>
                <img className="logo" src={logo} alt="logo" />
            </div>
           </header> 
        </div>
    );
}

export default header;
