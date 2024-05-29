import React, { useState, useEffect } from 'react';
import './App.css';

function Header({ children }) {
    return <h1>{children}</h1>;
}

function TodoItem({ todo, onEdit, onDelete }) {
    return (
        <div className="todo-item">
            <div className="todo-content">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
            </div>
            <div className="todo-actions">
                <button onClick={() => onEdit(todo.id)}>Edit</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
        </div>
    );
}

function TodoList({ todos, onEdit, onDelete }) {
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

function CreateTodoForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        onCreate({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <div className="create-todo-form">
            <input type="text" placeholder="할 일" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea
                placeholder="내용"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={handleCreate}>Add</button>
        </div>
    );
}

function EditTodoForm({ todo, onUpdate }) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleUpdate = () => {
        onUpdate({ ...todo, title, description });
    };

    return (
        <div className="edit-todo-form">
            <input type="text" placeholder="할 일" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea
                placeholder="내용"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

function App() {
    const [todos, setTodos] = useState([]);
    const [mode, setMode] = useState('HOME');
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    useEffect(() => {
        const localStorageTodos = localStorage.getItem('todos');
        if (localStorageTodos) {
            setTodos(JSON.parse(localStorageTodos));
        }
    }, []);

    const handleCreateTodo = (todo) => {
        const newTodoList = [...todos, { ...todo, id: todos.length + 1 }];
        setTodos(newTodoList);
        localStorage.setItem('todos', JSON.stringify(newTodoList));
        setMode('HOME');
    };

    const handleEditTodo = (id) => {
        setSelectedTodoId(id);
        setMode('EDIT');
    };

    const handleUpdateTodo = (updatedTodo) => {
        const updatedTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setMode('HOME');
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setMode('HOME');
    };

    return (
        <div className="app">
            <Header>Todo List</Header>
            <div className="todo-center">
                {mode === 'HOME' && (
                    <button className="add-button" onClick={() => setMode('CREATE')}>
                        Add Todo
                    </button>
                )}
                {mode === 'CREATE' && <CreateTodoForm onCreate={handleCreateTodo} />}
                <TodoList todos={todos} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
                {mode === 'EDIT' && (
                    <EditTodoForm todo={todos.find((todo) => todo.id === selectedTodoId)} onUpdate={handleUpdateTodo} />
                )}
            </div>
        </div>
    );
}

export default App;
