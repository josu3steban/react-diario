import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { googleLogin, login } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const { value, handleInputChange } = useForm({ email:'', password:'' });
    const dispatch = useDispatch();

    const handleLoginSubmit = ( e ) => {
        e.preventDefault();
        dispatch( login( value.email, value.password ) );
    }

    const handleLoginGoogle = () => {
        dispatch( googleLogin() );
    }
    
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLoginSubmit}>
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={value.email}
                    onChange={handleInputChange}
                />

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
                >
                    Login
                </button>

                <div className="auth__social-networks" onClick={ handleLoginGoogle }>
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
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
