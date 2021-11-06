import { types } from "../types/types";

const initilState = {
    note: [],
    active: null
}

export const noteReducer = ( state = initilState, action ) => {

    switch ( action.type ) {
        
        case types.noteActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case types.noteLoad:
            return {
                ...state,
                note: [...action.payload]
            }

        case types.noteAddNew:
            return {
                ...state,
                note: [action.payload, ...state.note]
            }
        
        case types.noteUpdate:
            return {
                ...state,
                note: state.note.map(
                    ( note ) => note.id === action.payload.id
                    ? action.payload
                    : note
                )
            }
            
        case types.noteDelete:
            return {
                ...state,
                active: null,
                note: state.note.filter( note => note.id !== action.payload )
            }

        case types.noteLogoutClean:
            return {
                ...state,
                active: null,
                note: []
            }
        
        default:
            return state;
        
    }
    
}