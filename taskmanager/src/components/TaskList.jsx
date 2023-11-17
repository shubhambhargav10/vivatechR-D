import React, { useState } from "react";
import ListItem from "./ListItem";
import "./TaskList.css";

const TaskList = ({ tasks, completeTask, removeTask, updateTask }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const pendingTask = [];
  const completedTask = [];
  tasks.forEach((item) => {
    if (item.isComplete === true) completedTask.push(item);
    else pendingTask.push(item);
  });

  return (
    <>
      <div className="task-list">
        <div>
          {pendingTask.length > 0 ? (
            pendingTask.map((task, index) => (
              <div className="task-pending" key={index}>
                <ListItem
                  task={task}
                  completeTask={completeTask}
                  removeTask={removeTask}
                  submitUpdate={submitUpdate}
                  edit={edit}
                  setEdit={setEdit}
                />
              </div>
            ))
          ) : (
            <p>Task list is empty</p>
          )}
        </div>

        {completedTask.length > 0 && (
          <div className="task-list">
            <h6>Completed Tasks</h6>
            <hr />
          </div>
        )}

        <div>
          {completedTask.length > 0 &&
            completedTask.map((task, index) => (
              <div className="task-completed" key={index}>
                <ListItem
                  task={task}
                  completeTask={completeTask}
                  removeTask={removeTask}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;