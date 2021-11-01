import { types } from "../types/types"


export const uiSetError = ( typeError, err ) => {

    return {
        type: types.uiSetError,
        payload: {typeError, err}
    }
    
}

export const uiRemoveError = ( ) => {

    return {
        type: types.uiRemoveError,
    }
    
}

export const startLoading = () => {
    return {
        type: types.uiStartLoading
    }
}

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading
    }
}