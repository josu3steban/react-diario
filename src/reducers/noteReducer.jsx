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
        
        default:
            return state;
        
    }
    
}