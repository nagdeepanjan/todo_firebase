import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

/**
 * The Auth component serves as a container for the Login and SignUp components.
 * It allows the user to toggle between the login and sign-up views.
 */
const Auth = () => {
    // State to track whether the user is viewing the Login form or the SignUp form.
    const [isLogin, setIsLogin] = useState(true);

    // Function to toggle between the Login and SignUp views.
    const toggleAuthMode = () => {
        setIsLogin(prevState => !prevState);
    };

    return (
        <div>
            {/* Conditionally render either the Login or SignUp component */}
            {isLogin ? <Login /> : <SignUp />}
            <button onClick={toggleAuthMode}>
                {isLogin ? 'Need to create an account?' : 'Already have an account?'}
            </button>
        </div>
    );
};

export default Auth;
