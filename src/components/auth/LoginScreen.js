import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { emailPasswordLogin, googleLogin } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';
import { uiRemoveError, uiSetError } from '../../actions/uiActions';

export const LoginScreen = () => {

    const { value, handleInputChange } = useForm({ email:'', password:'' });
    const {msgError, typeError, loading} = useSelector( (state) => { return state.ui });
    const dispatch = useDispatch();

    const { email, password } = value;
    
    const handleLoginSubmit = ( e ) => {
        e.preventDefault();
        console.log('CLICK LOGIN');
        if( isFormValid() ) {
            dispatch( emailPasswordLogin( email, password ) );
        }
    }

    const handleLoginGoogle = () => {
        dispatch( googleLogin() );
    }

    const isFormValid = () => {

        if( !validator.isEmail( email ) ) {

            dispatch( uiSetError('emailError', 'Ingrese un email correcto') );
            return false;

        }else if( password.length <= 5 ) {

            dispatch( uiSetError('passError' ,'La contraseña debe tener mínimo 6 caracteres') );
            return false;

        }

        dispatch( uiRemoveError() );
        return true;
    }
    
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLoginSubmit}>
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
                    value={value.email}
                    onChange={handleInputChange}
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
                    value={value.password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks" >
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={ handleLoginGoogle }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
