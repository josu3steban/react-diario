import { addDoc, collection, getDocs, updateDoc, doc } from "@firebase/firestore";
import { types } from "../types/types";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";


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

export const saveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const id = getState().auth.uid;
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        if( !noteToFirestore.url ) {
            delete noteToFirestore.url;
        }

        const docRef = doc( db, `/${id}/diario/notes/${note.id}`);
        await updateDoc( docRef, noteToFirestore );
        
        dispatch( refreshNote(note.id, noteToFirestore) );

        Swal.fire("Guardado", note.title, "success");
    }    
}

//Activa la nota en el NoteScreen para poder escribir en ella
export const activeNote = ( id, note ) => {

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

export const refreshNote = ( id, note ) => {

    return {
        type: types.noteUpdate,
        payload: {
            id,
            ...note
        }
    }
    
}