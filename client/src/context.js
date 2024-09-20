import React, { createContext, useReducer } from "react"

export const NotesContext = createContext()
function reducer(state, action) {
    switch (action.type) {
        case "SET__VALIDATION__ERRORS": {
            return {
                ...state,
                errMessages: action.payload
            }
        }
        case "SET__NOTES":

            return {
                ...state,
                notes: {
                    ...state.notes.notes,
                    data: action.payload,

                },

            }

        case "FETCH__NOTES__SUCCESS":
            return {
                ...state,
                notes: {
                    loading: false,
                    data: action.payload,
                    error: null
                },


            }
        case "FETCH__NOTES__ERROR":
            return {
                ...state,
                notes: {
                    loading: false,
                    data: [],
                    error: action.payload
                },


            }
        case "SET__ALERT": {
            return {
                ...state,
                alert: action.payload
            }
        }
        case "CLEAR__ALERT": {
            return {
                ...state,
                alert: {
                    active: false,
                    msg: "",
                    color: ""
                }
            }
        }
        case "SET__USER": {
            return {
                ...state,
                user: action.payload
            }
        }
        case "SET__USERS": {
            return {
                ...state,
                users: action.payload
            }
        }

        case "TOOGLE__ADD__NOTE__MODAL":
            return {
                ...state,
                modal: !state.modal
            }
        default: return state;
    }


}
export const NotesProvider = ({ children }) => {
    const notesState = {
        users: [],
        notes: {
            loading: true,
            data: [],
            error: null
        },
        alert: {
            active: false,
            msg: "",
            color: ""
        },
        errMessages: [],
        modal: false,
        user: JSON.parse(localStorage.getItem("user")) || {
            name: "",
            auth: false,

        }

    }

    const [state, dispatch] = useReducer(reducer, notesState)

    return (
        <NotesContext.Provider value={{ state: state, dispatch }}>
            {children}
        </NotesContext.Provider>
    )
}
