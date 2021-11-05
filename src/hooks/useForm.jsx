import { useState } from "react";


export const useForm = ( initialState={} ) => {

    const [ value, setValue ] = useState( initialState );

    const reset = ( newFormState = initialState ) => {
        setValue( newFormState );
    }
    
    const handleInputChange = ( { target } ) => {
        setValue({
            ...value,
            //Establece una pripieda con el nombre del input y guarda el value en este
            [target.name]: target.value
        });
    }

    return {
        value,
        handleInputChange,
        reset
    }
}