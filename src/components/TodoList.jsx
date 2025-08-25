import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

/**
 * The TodoList component is the core of the application.
 * It handles displaying, creating, updating, and deleting todo items for the logged-in user.
 */
const TodoList = () => {
    // State to hold the list of todos for the current user.
    const [todos, setTodos] = useState([]);
    // State for the text of a new todo being added.
    const [newTodo, setNewTodo] = useState('');
    // State for the target date of a new todo.
    const [targetDate, setTargetDate] = useState('');

    // State to track which todo item is currently being edited.
    // If null, no item is being edited. Otherwise, it holds the todo object.
    const [editingTodo, setEditingTodo] = useState(null);
    // State for the updated text in the edit form.
    const [updatedText, setUpdatedText] = useState('');
    // State for the updated target date in the edit form.
    const [updatedTargetDate, setUpdatedTargetDate] = useState('');

    // useEffect hook to fetch todos from Firestore when the component mounts.
    useEffect(() => {
        // Only fetch todos if a user is logged in.
        if (auth.currentUser) {
            // Create a Firestore query to get todos for the current user, ordered by creation date.
            const q = query(collection(db, 'todos'), where('uid', '==', auth.currentUser.uid));

            // onSnapshot sets up a real-time listener.
            // The callback will fire every time the query results change.
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const todosArray = [];
                querySnapshot.forEach((doc) => {
                    // Push the document data and its ID to the array.
                    todosArray.push({ ...doc.data(), id: doc.id });
                });
                // Update the component's state with the new list of todos.
                setTodos(todosArray);
            });

            // Return a cleanup function to unsubscribe from the listener when the component unmounts.
            return () => unsubscribe();
        }
    }, []); // The empty dependency array ensures this effect runs only once on mount.

    /**
     * Handles adding a new todo item to Firestore.
     */
    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim() === '') return; // Prevent adding empty todos.

        // Add a new document to the 'todos' collection.
        await addDoc(collection(db, 'todos'), {
            uid: auth.currentUser.uid, // Associate the todo with the current user.
            text: newTodo,
            completed: false,
            targetDate: targetDate,
            createdAt: new Date(),
        });

        // Clear the input fields after adding.
        setNewTodo('');
        setTargetDate('');
    };

    /**
     * Toggles the 'completed' status of a todo item.
     * @param {object} todo - The todo item to update.
     */
    const handleToggleComplete = async (todo) => {
        // Get a reference to the specific todo document.
        const todoRef = doc(db, 'todos', todo.id);
        // Update the 'completed' field.
        await updateDoc(todoRef, {
            completed: !todo.completed,
        });
    };

    /**
     * Deletes a todo item from Firestore.
     * @param {string} id - The ID of the todo item to delete.
     */
    const handleDeleteTodo = async (id) => {
        // Get a reference to the specific todo document and delete it.
        await deleteDoc(doc(db, 'todos', id));
    };

    /**
     * Enters "edit mode" for a specific todo item.
     * @param {object} todo - The todo item to be edited.
     */
    const startEditing = (todo) => {
        setEditingTodo(todo);
        setUpdatedText(todo.text);
        setUpdatedTargetDate(todo.targetDate);
    };

    /**
     * Handles the submission of the update form.
     */
    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        if (!editingTodo) return;

        // Get a reference to the specific todo document.
        const todoRef = doc(db, 'todos', editingTodo.id);
        // Update the text and targetDate fields.
        await updateDoc(todoRef, {
            text: updatedText,
            targetDate: updatedTargetDate,
        });

        // Exit "edit mode".
        setEditingTodo(null);
        setUpdatedText('');
        setUpdatedTargetDate('');
    };

    return (
        <div>
            {/* Form for adding new todos */}
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>

            {/* List of todos */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {/* Check if the current todo is the one being edited */}
                        {editingTodo && editingTodo.id === todo.id ? (
                            // If yes, show the update form
                            <form onSubmit={handleUpdateTodo} className="update-form">
                                <input
                                    type="text"
                                    value={updatedText}
                                    onChange={(e) => setUpdatedText(e.target.value)}
                                />
                                <input
                                    type="date"
                                    value={updatedTargetDate}
                                    onChange={(e) => setUpdatedTargetDate(e.target.value)}
                                />
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setEditingTodo(null)}>Cancel</button>
                            </form>
                        ) : (
                            // If no, show the todo text and action buttons
                            <>
                                <span>{todo.text} - (Target: {todo.targetDate || 'None'})</span>
                                <div className="todo-buttons">
                                    <button onClick={() => handleToggleComplete(todo)}>
                                        {todo.completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                    <button onClick={() => startEditing(todo)}>Update</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
