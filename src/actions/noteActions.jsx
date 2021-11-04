import { addDoc, collection, getDocs } from "@firebase/firestore";
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

        const docRef = await collection(db, `${uid}/diario/notes`);
        const doc    = await addDoc(docRef, newNote);

        dispatch( activeNote( doc.id, newNote ) );
    }
    
}

export const loadNotes = ( id ) => {

    return async ( dispatch ) => {

        const docRef = collection(db, `${id}/diario/notes`);
        // console.log( docRef );

        const docSnap = await getDocs(docRef);
        const notes = [];
        
        docSnap.forEach( ( data ) => {
            
            notes.push({
                id: data.id,
                ...data.data()
            })
            
        })

        dispatch( setNote( notes ) );
        
    }
    
}

//Activa la nota en el NoteScreen para poder escribir en ella
const activeNote = ( id, note ) => {

    return {
        type: types.noteActive,
        payload: {
            id,
            ...note
        }
    }
    
}

const setNote = ( notes ) => {

    return {
        type: types.noteAddNew,
        payload: notes
    }
    
}