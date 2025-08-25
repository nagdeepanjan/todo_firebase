import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

/**
 * The Login component provides a form for users to sign in with their email and password.
 */
const Login = () => {
    // State for the email and password form fields.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to hold any error messages from Firebase.
    const [error, setError] = useState(null);

    /**
     * Handles the form submission for user login.
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.
        setError(null); // Clear any previous errors.
        try {
            // Attempt to sign in with the provided credentials using Firebase Auth.
            await signInWithEmailAndPassword(auth, email, password);
            // If successful, the onAuthStateChanged listener in App.jsx will handle the redirect.
        } catch (error) {
            // If there's an error (e.g., wrong password), display it to the user.
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {/* Display the error message if one exists */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;
