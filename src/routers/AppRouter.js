import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { app } from '../firebase/firebaseConfig';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadNotes } from '../actions/noteActions';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const auth = getAuth( app );
    const [ checkingLogin, setCheckingLogin ] = useState( true );
    const [ isLogged, setIsLogged ] = useState( false );

    useEffect(() => {
        onAuthStateChanged( auth, ( user ) => {

            if( user?.uid ) {

                dispatch( login( user.uid, user.displayName ));
                setIsLogged( true );

                dispatch( loadNotes( user.uid ) );
                // loadNotes( user.uid );

            }else {
                
                setIsLogged( false );

            }

            setCheckingLogin( false );

        });
    }, [ auth, dispatch ])

    if( checkingLogin ) {

        return (
            <h1>Espere...</h1>
        )
        
    }
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={ isLogged } 
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <PrivateRoute
                        isAuthenticated={ isLogged } 
                        exact
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
