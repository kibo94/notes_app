import React, { useState } from 'react';
import { Link } from "react-router-dom"
import "./NavBar.css"

const NavBar = ({ user, dispatch }) => {
  const [toogleMenu, setToogleMenu] = useState(false)
  const logoutHanlder = () => {
    dispatch({ type: "SET__USER", payload: { name: "", auth: false } })
    setToogleMenu(!toogleMenu)
    localStorage.removeItem("user")
  }
  const toogleMenuHandler = () => {
    setToogleMenu(!toogleMenu)
  }
  return (
    <div className="Nav">
      <div className={`NavLinks ${toogleMenu ? "open" : ""}`} >
        <Link onClick={toogleMenuHandler} to="/">Home</Link>
        <Link onClick={toogleMenuHandler} to="/drafts">Drafts</Link>
        <Link onClick={toogleMenuHandler} to="/register">Register</Link>
        {!user.auth ? <Link to="/login" onClick={toogleMenuHandler} >Login</Link> : null}
      </div>
      <p>
        {user.auth ? <Link onClick={logoutHanlder} to="/"><i className="fa fa-sign-out"></i></Link> : null}
        {user.auth ? user.name : null}
      </p>
      <div onClick={toogleMenuHandler} className="burger"><i className="fa fa-bars"></i></div>
    </div>
  );
}

export default NavBar;
