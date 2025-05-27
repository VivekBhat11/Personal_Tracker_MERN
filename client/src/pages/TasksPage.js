import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  // 👉 Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [token]);

  // 👉 Add a new task
  const addTask = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  // 👉 Mark task as completed
  const updateTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: 'completed'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks(tasks.map(task =>
        task._id === taskId ? { ...task, status: 'completed' } : task
      ));
    } catch (err) {
      console.error(err);
    }
  };

  // 👉 Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container'style={{ padding: '20px' }}>
      <h2>📋 Task Manager</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <button onClick={addTask}>➕ Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id} style={{ marginBottom: '10px' }}>
            <strong>{task.title}</strong> - {task.description} ({task.status})
            <br />
            {task.status !== 'completed' && (
              <button onClick={() => updateTask(task._id)}>✅ Complete</button>
            )}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px' }}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
