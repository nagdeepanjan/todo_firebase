import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin(prevState => !prevState);
    };

    return (
        <div>
            {isLogin ? <Login /> : <SignUp />}
            <button onClick={toggleAuthMode}>
                {isLogin ? 'Need to create an account?' : 'Already have an account?'}
            </button>
        </div>
    );
};

export default Auth;
