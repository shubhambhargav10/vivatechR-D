import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; 
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [taskText, setTaskText] = useState('');
  const navigate = useNavigate();

  const handleAddTask = async () => {
    try {
      await axios.post('https://tricky-pear-prawn.cyclic.app/addtask', { task: taskText });
      setTaskText('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
const goToTasks = ()=>{
  navigate('/alltasks')
}
  return (
    <div className="task-form-container">
      <h2 className="add-task-header">Add Task</h2>
      <div className="task-input-container">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="task-input"
          placeholder="Enter your task here..."
        />
        <button onClick={handleAddTask} className="add-task-button">
          Add Task
        </button>
      </div>
      <button onClick={goToTasks}>Check Your Tasks</button>
    </div>
  );
};

export default TaskForm;
