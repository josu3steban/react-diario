import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@firebase/auth'
import { app, googleAuthProvider } from '../firebase/firebaseConfig'
import { types } from "../types/types"
import { finishLoading, startLoading } from './uiActions'

export const emailPasswordRegister = ( email, password, name ) => {

    return ( dispatch ) => {

        dispatch( startLoading() );
        
        const auth = getAuth( app );
        createUserWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {
                updateProfile( user, { displayName: name });
                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log("ERRRRRROOOORRR - authAction-Linea-15", e);
                dispatch( finishLoading() );
                Swal.fire('ERROR', e.message, 'error');
            })
    }
}

export const emailPasswordLogin = ( email, password ) => {
    return ( dispatch ) => {
        
        dispatch( startLoading() );
        
        const auth = getAuth( app );
        signInWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
            })
            .catch( ( e ) => {
                console.log('ERROR authAction - Linea 28', e);
                dispatch( finishLoading() );
                Swal.fire('ERROR', 'Correo o Constraseña incorrecta', 'error');
            });
    }
}

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

export const logout = () => {
    return async ( dispatch ) => {

        const auth = getAuth( app );
        await signOut( auth );
        dispatch( authLogout() );
    }
}

export const login = ( uid, name ) => {
    return {
        type: types.login,
        payload: { uid, name }
    }
}

export const authLogout = () => {
    return {
        type: types.logout
    }
}
