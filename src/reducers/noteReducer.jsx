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
        
        case types.noteAddNew:
            return {
                ...state,
                note: [...action.payload]
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
            
        default:
            return state;
        
    }
    
}