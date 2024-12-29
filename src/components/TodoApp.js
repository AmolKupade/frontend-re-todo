import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    const fetchTodos = async () => {
        const res = await axios.get('http://localhost:5000/api/todos');
        setTodos(res.data);
    };

    const addTodo = async () => {
        if (title.trim() === '') return;
        const res = await axios.post('http://localhost:5000/api/todos', { title });
        setTodos([...todos, res.data]);
        setTitle('');
    };

    const updateTodo = async (id, completed) => {
        const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed });
        setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="container">
            <h1>Todo App</h1>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button className="add-btn" onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <span className={todo.completed ? "completed" : ""}>
                            {todo.title}
                        </span>
                        <div>
                            <button
                                className="complete-btn"
                                onClick={() => updateTodo(todo._id, !todo.completed)}
                            >
                                {todo.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteTodo(todo._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default TodoApp;
