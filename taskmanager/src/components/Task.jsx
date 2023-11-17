import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./Task.css";


const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks"))||[];
    if (allTasks) {
      setTasks(allTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (!task.text) alert ('cannot add empty task!')
    setTasks([...tasks, task]);
  };

  const removeTask = (id) => {
    const removeArray = tasks.filter((task) => task.id !== id);
    setTasks(removeArray);
  };

  const updateTask = (taskId, newValue) => {
    if (!newValue.text) return;
    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
  };
  const completeTask = (id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="main-container">
      <h1 className="tasklist-header">My Task Manager</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        updateTask={updateTask}
        completeTask={completeTask}
      />
    </div>
  );
};

export default Task;