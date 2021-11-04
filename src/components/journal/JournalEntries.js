import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const { note } = useSelector( state => state.note );

    return (
        <div className="journal__entries">
            
            {
                note.map( data => (
                    <JournalEntry
                        key={ data.id }
                        { ...data }
                    />
                ))
            }

        </div>
    )
}
