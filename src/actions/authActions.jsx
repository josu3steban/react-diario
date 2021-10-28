import { getAuth, signInWithPopup } from '@firebase/auth'
import { app, googleAuthProvider } from '../firebase/firebaseConfig'
import { types } from "../types/types"

export const googleLogin = () => {
    return ( dispatch ) => {

        const auth = getAuth( app );

        signInWithPopup( auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) )
            })
            .catch( e => {
                console.log("ERRRRRROOOORRR - authAction-Linea-15", e)
            })
    }
}

export const login = ( uid, name ) => {
    return {
        type: types.login,
        payload: { uid, name }
    }
}