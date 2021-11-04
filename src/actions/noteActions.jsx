import { addDoc, collection } from "@firebase/firestore";
import { types } from "../types/types";
import { db } from "../firebase/firebaseConfig";


export const newNote = () => {

    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await collection(db, `/${uid}/diario/notes`);
        const doc    = await addDoc(docRef, newNote);

        dispatch( activeNote( doc.id, newNote ) );
    }
    
}

//Activa la nota (en blanco) en el NoteScreen para poder escribir en ella
const activeNote = ( id, note ) => {

    return {
        type: types.noteActive,
        payload: {
            id,
            ...note
        }
    }
    
}