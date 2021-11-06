import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "@firebase/firestore";
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
        dispatch( addNoteOnScreen( doc.id, newNote ) );
    }
    
}

export const addNoteOnScreen = ( id, note ) => {
    return {
        type: types.noteAddNew,
        payload: {
            id,
            ...note
        }
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

export const saveImage = ( file ) => {
    return async( dispatch, getState ) => {

        const activeNote = getState().note.active;

        //configuracion para subir imagen a Cloudinary
        const cloudUrl = 'https://api.cloudinary.com/v1_1/dpvbia22j/upload';
        const formDate = new FormData();
        formDate.append('upload_preset', 'react-diario');
        formDate.append('file', file);

        // try {

            const resp = await fetch( cloudUrl, {
                method: 'POST',
                body: formDate
            });

            if( resp.ok ) {
                // const cloudResp = await resp.json();
                //Url de la imagen
                // return cloudResp.secure_url;
            } else {
                throw await resp.json();
            }
            
        // } catch( err ) {

            // throw err;

        // }

        
        Swal.fire({
            title:'Cargando',
            text:'Por favor espere...',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        
        const cloudResp = await resp.json();
        const fileUrl = cloudResp.secure_url;

        activeNote.url = fileUrl;
        
        dispatch( saveNote( activeNote ) );

        Swal.close();
    }
}

export const deleteNote = ( noteId ) => {
    return async( dispatch, getState ) => {

        const userId = getState().auth.uid;
        const docRef = doc(db, `${userId}/diario/notes/${noteId}`);
        await deleteDoc( docRef );

        dispatch( borrarNota( noteId ) );
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
        type: types.noteLoad,
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

const borrarNota = ( id ) => {
    return {
        type: types.noteDelete,
        payload: id
    }    

}

export const noteLogout = () => {
    return {
        type: types.noteLogoutClean,
    }
}