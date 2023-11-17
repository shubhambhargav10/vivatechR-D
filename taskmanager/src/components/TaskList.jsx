import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import * as XLSX from 'xlsx';
import {FallingLines} from 'react-loader-spinner'
import Swal from 'sweetalert2';



const TaskList = () => {

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({
    id: null,
    task: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://tricky-pear-prawn.cyclic.app/alltasks');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire('Task Deleted')
    try {
      setLoading(true);
      await axios.delete(`https://tricky-pear-prawn.cyclic.app/deletetask/${id}`);
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
      setLoading(true);
      await axios.put(`https://tricky-pear-prawn.cyclic.app/edittask/${editTask.id}`, {
        task: editTask.task,
      });
      setEditTask({
        id: null,
        task: '',
      });
      Swal.fire('Updated')
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
      {loading ? (
      <div className='loading-container'>  <FallingLines
        color="#4fa94d"
        width={100}
        visible={true}
        ariaLabel="falling-lines-loading" />
        <p>Loading...Please Wait</p>
    </div>
      ) : (
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
      )}
      <button className='export-button' onClick={handleExportToExcel}>Export List</button>
    </div>
  );
};

export default TaskList;
