import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TasksPage from './pages/TasksPage';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div>
        <h1>Personal Task Manager</h1>
        {!token && (
          <nav>
            <Link to="/">Register</Link> | <Link to="/login">Login</Link>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/tasks"
            element={token ? <TasksPage token={token} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
