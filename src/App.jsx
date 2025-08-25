import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        {user && <button onClick={handleLogout}>Logout</button>}
      </header>
      <main>
        {user ? <TodoList /> : <Auth />}
      </main>
    </div>
  );
}

export default App;
