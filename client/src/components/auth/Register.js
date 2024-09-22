import React, { useContext, useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import authValidation from "../../utilys/authValidation"
import ValidationErrMesages from "../UI/ValidationErrMesages/ValidationErrMesages"
import { NotesContext } from "../../context";
import axios from "../../utilys/axios";
import { getUser } from '../../utilys/getUser';
import { useHistory } from 'react-router-dom';
import "./Form.css"
const Register = () => {
    const { state, dispatch } = useContext(NotesContext);
    const history = useHistory();
    // RESET REGISTER FORM ERROR MESSAGES
    useEffect(() => {
        dispatch({ type: "SET__VALIDATION__ERRORS", payload: [] });
    }, [dispatch]);

    const loginFrom = {
        email: "",
        passowrd: ""
    }
    let [regiserInputs, setInputValue] = useForm(loginFrom);

    const registerHandler = (e) => {
        e.preventDefault();
        // Get email and password form register inptus obejct
        let { email, passowrd } = regiserInputs;
        // Validation of  regiser form

        if (!authValidation(email, passowrd).valid) {

            dispatch({ type: "SET__VALIDATION__ERRORS", payload: authValidation(email, passowrd).messages });
        }
        else {

            if (getUser(state.users, email)) {
                dispatch({ type: "SET__VALIDATION__ERRORS", payload: ["User  exists"] });
            }
            else {
                axios.post("/users", { email, passowrd }).then((data) => {
                    dispatch({ type: "SET__USERS", payload: data.data.users });
                    history.push("/login")
                })
            }

        }
    }
    return (
        <div class="Form">
            <form >
                <input placeholder="Enter your email" name="email" onChange={setInputValue} />
                <input placeholder="Enter your passowrd" name="passowrd" onChange={setInputValue} />
                <input onClick={registerHandler} className="btn btn-primary" type="submit" value="Register" />
                <ValidationErrMesages errMessages={state.errMessages} />
            </form>

        </div>
    )
}

export default Register;