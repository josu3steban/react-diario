import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, deleteNote } from '../../actions/noteActions';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.note );
    const { value, handleInputChange, reset } = useForm( note );
    const activeId = useRef( note.id );
    
    useEffect(() => {

        if( activeId.current !== note.id ) {

            reset( note );
            activeId.current = note.id;
            
        }
        
    }, [reset, note]);

    useEffect( () => {

        dispatch( activeNote( value.id, value) );
        
    }, [dispatch,value]);
    
    const handleDelete = () => {
        // console.log(note.id);

        dispatch( deleteNote( note.id ) );
    }
    
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ value.title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ value.body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    ( value.url )
                    && (
                        <div className="notes__image">
                            <img 
                                src={ value.url }
                                alt="imagen"
                            />
                        </div>
                    )
                }
            </div>
            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Borrar
            </button>

        </div>
    )
}
