import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveNote } from '../../actions/noteActions';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const note = useSelector( state => state.note.active );
    
    const hanldeEntrySave = () => {

        dispatch( saveNote( note ) );
        
    }
    
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button className="btn" onClick={ hanldeEntrySave }>
                    Save
                </button>
            </div>
        </div>
    )
}
