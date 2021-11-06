import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveImage, saveNote } from '../../actions/noteActions';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const note = useSelector( state => state.note.active );
    
    const hanldeEntrySave = () => {
        
        dispatch( saveNote( note ) );
        
    }
    
    const handleSaveImage = () => {
        console.log('click save image');
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChange = ( e ) => {
        const file = e.target.files[0];

        if( file ) {
            dispatch( saveImage( file ) );
        }
    }
    
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <div>

                <input 
                    id="fileSelector"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={ handleFileChange }
                />

                <button className="btn" onClick={ handleSaveImage }>
                    Picture
                </button>

                <button className="btn" onClick={ hanldeEntrySave }>
                    Save
                </button>
            </div>
        </div>
    )
}
