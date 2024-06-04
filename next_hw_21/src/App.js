import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Detail from './components/Detail';
import PostForm from './components/PostForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/edit/:id" element={<PostForm />} />
                <Route path="/new" element={<PostForm />} />
            </Routes>
        </Router>
    );
}

export default App;
