import React from 'react';
import validator from 'validator'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { uiRemoveError, uiSetError } from '../../actions/uiActions';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError, typeError} = useSelector( (state) => { return state.ui });
    console.log(msgError);
    console.log(typeError);
    
    const { value, handleInputChange } = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = value;
    
    const isFormValid = () => {

        if( name.trim().length === 0 ) {

            dispatch( uiSetError('nameError' ,'Ingrese un nombre') );
            return false;

        }else if( !validator.isEmail( email ) ) {

            dispatch( uiSetError('emailError', 'Ingrese un email correcto') );
            return false;

        }else if( password.length <= 5 ) {

            dispatch( uiSetError('passError' ,'La contraseña debe tener mínimo 6 caracteres') );
            return false;

        }else if( password !== password2 ) {

            dispatch( uiSetError('passEqualsError', 'Las constraseñas no coinciden') );
            return false;

        }

        dispatch( uiRemoveError() );
        return true;
        
    }
    
    const handleRegister = ( e ) => {
        e.preventDefault();

        if( ( isFormValid() ) ) {
            console.log('FORMULARIO CORRECTO');
        }

        console.log(name, email, password, password2);
    }
    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            {/* <p className='auth__alert-error'>Error en un campo</p> */}

            <form onSubmit={ handleRegister }>

                {
                    (typeError==='nameError')
                    && ( <span className='auth__input-error'>{ msgError }</span> )
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ value.name }
                    onChange={ handleInputChange }
                />
                
                {
                    (typeError==='emailError')
                    && ( <span className='auth__input-error'>{ msgError }</span> )
                }
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                />
                
                {
                    (typeError==='passError')
                    && ( <span className='auth__input-error'>{ msgError }</span> )
                }
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={ handleInputChange }
                />

                {
                    (typeError==='passEqualsError')
                    && ( <span className='auth__input-error'>{ msgError }</span> )
                }
                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
