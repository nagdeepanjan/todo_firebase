import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  // State to hold the current user object. Null if no user is logged in.
  const [user, setUser] = useState(null);

  // useEffect hook to listen for changes in the user's authentication state.
  // This is the recommended way to get the current user.
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function that we can use for cleanup.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Cleanup function: Unsubscribe from the listener when the component unmounts.
    return () => unsubscribe();
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // Function to handle user logout.
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will automatically update the user state to null.
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        {/* Show logout button only if a user is logged in */}
        {user && <button onClick={handleLogout}>Logout</button>}
      </header>
      <main>
        {/* Conditionally render the TodoList or the Auth component based on user state */}
        {user ? <TodoList /> : <Auth />}
      </main>
    </div>
  );
}

export default App;
