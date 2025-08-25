import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [updatedText, setUpdatedText] = useState('');
    const [updatedTargetDate, setUpdatedTargetDate] = useState('');

    useEffect(() => {
        if (auth.currentUser) {
            const q = query(collection(db, 'todos'), where('uid', '==', auth.currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const todosArray = [];
                querySnapshot.forEach((doc) => {
                    todosArray.push({ ...doc.data(), id: doc.id });
                });
                setTodos(todosArray);
            });
            return () => unsubscribe();
        }
    }, []);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;
        await addDoc(collection(db, 'todos'), {
            uid: auth.currentUser.uid,
            text: newTodo,
            completed: false,
            targetDate: targetDate,
            createdAt: new Date(),
        });
        setNewTodo('');
        setTargetDate('');
    };

    const handleToggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed,
        });
    };

    const handleDeleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
    };

    const startEditing = (todo) => {
        setEditingTodo(todo);
        setUpdatedText(todo.text);
        setUpdatedTargetDate(todo.targetDate);
    };

    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        if (!editingTodo) return;
        await updateDoc(doc(db, 'todos', editingTodo.id), {
            text: updatedText,
            targetDate: updatedTargetDate,
        });
        setEditingTodo(null);
        setUpdatedText('');
        setUpdatedTargetDate('');
    };

    return (
        <div>
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
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {editingTodo && editingTodo.id === todo.id ? (
                            <form onSubmit={handleUpdateTodo}>
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
                                <button onClick={() => setEditingTodo(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                {todo.text} - {todo.targetDate}
                                <button onClick={() => handleToggleComplete(todo)}>
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                <button onClick={() => startEditing(todo)}>Update</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
