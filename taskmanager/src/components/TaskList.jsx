import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import * as XLSX from 'xlsx';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({
    id: null,
    task: '',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/alltasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/deletetask/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditTask({
      id: task._id,
      task: task.task,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/edittask/${editTask.id}`, {
        task: editTask.task,
      });
      setEditTask({
        id: null,
        task: '',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const handleExportToExcel = () => {
    const data = tasks.map((task) => ({ Task: task.task, Status: task.isComplete ? 'Completed' : 'Pending' }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Task List');
    XLSX.writeFile(wb, 'TaskList.xlsx');
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-header">Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            {task._id === editTask.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editTask.task}
                  onChange={(e) =>
                    setEditTask({ ...editTask, task: e.target.value })
                  }
                  className="edit-task-input"
                />
                <button onClick={handleUpdate} className="update-button">
                  Update
                </button>
              </div>
            ) : (
              <div className="task-text">
                <span>{task.task}</span>
              </div>
            )}
            <div className="task-actions">
              <button onClick={() => handleEdit(task)} className="edit-button">
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleExportToExcel}>Export List</button>
    </div>
  );
};

export default TaskList;
