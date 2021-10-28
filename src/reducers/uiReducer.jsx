import { types } from "../types/types"


const initialState = {
    loading: false,
    typeError: null,
    msgError: null
}

export const uiReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case types.uiSetError:
            return {
                ...state,
                typeError: action.payload.typeError,
                msgError: action.payload.err
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        default:
            return state
    }
}