import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FallingLines } from 'react-loader-spinner'; 

const TaskForm = () => {
  const [taskText, setTaskText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (taskText === '') {
      Swal.fire('Please Add Some Task')
    }
    else{
      setLoading(true);
      try {
        await axios.post('https://tricky-pear-prawn.cyclic.app/addtask', { task: taskText });
        Swal.fire('Task Added To List ')
        setLoading(false);
        setTaskText('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
    
  };

  const goToTasks = () => {
    navigate('/alltasks');
  };

  return (
    loading ? (
      <div className='loading-container'>
        <FallingLines
          color="#4fa94d"
          width={100}
          visible={true}
          ariaLabel="falling-lines-loading"
        />
        <p>Loading...Please Wait</p>
      </div>
    ) : (
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
        <button className='check-your-tasks' onClick={goToTasks}>Check Your Tasks</button>
      </div>
    )
  );
}

export default TaskForm;
