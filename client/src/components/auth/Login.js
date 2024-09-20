import React, { useContext, useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import authValidation from "../../utilys/authValidation"
import { getUser } from "../../utilys/getUser";
import ValidationErrMesages from "../UI/ValidationErrMesages/ValidationErrMesages"
import { NotesContext } from "../../context";
import { useHistory } from 'react-router-dom';
import "./Form.css"
const Login = () => {
    const {state , dispatch} = useContext(NotesContext)
    const history = useHistory();

    const loginFrom = {
        email : "",
        passowrd : ""
    };
    // RESET LOGIN INPUT VALIDATION ERROR MESSAGES...
    useEffect(() => {
        dispatch({type:"SET__VALIDATION__ERRORS" , payload:[]});
    })

    let [loginInputs , setLoginInputsValue] = useForm(loginFrom);

    const loginHandler = (e) => {
        e.preventDefault();
        // Get email and password form login inptus obejct
        let {email , passowrd} = loginInputs;
        // Find user form db with email
        let user =  getUser(state.users,email);
        // Validation of  login form
        if(!authValidation(email,passowrd)) {
                dispatch({type:"SET__VALIDATION__ERRORS" , payload:authValidation(email,passowrd).messages});
        }
        else {

            if(user){
                    if(user.passowrd === passowrd){
                        dispatch({type:"SET__USER" , payload:{...state.user,auth:true , name:email,passowrd}});
                        localStorage.setItem("user",JSON.stringify({...state.user ,auth:true, name:email,passowrd}));
                        history.push("/")
                    }
                    else{
                        dispatch({type:"SET__VALIDATION__ERRORS" , payload:["Password is incorect"]});
                    }
            }
            else{
                        dispatch({type:"SET__VALIDATION__ERRORS" , payload:["User not exists"]});
                
            }
        }
    }
    return (
        <div className="Form">
            <form >
                <input  placeholder="Enter your email" name="email" onChange={setLoginInputsValue}/>
                <input placeholder="Enter your passowrd" name="passowrd" onChange={setLoginInputsValue}/>
                <input onClick={loginHandler} className="btn btn-primary" type="submit" value="Login"/>
                <ValidationErrMesages errMessages={state.errMessages}/>
            </form>
      
        </div>
    )
}

export default Login
