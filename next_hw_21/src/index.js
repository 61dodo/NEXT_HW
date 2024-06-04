import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

localStorage.removeItem('posts');

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
