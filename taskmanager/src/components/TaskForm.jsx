import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dt = props.edit ? props.edit.id : new Date().getTime();

    props.onSubmit({
      id: dt,
      text: input,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form-container">
      <div className="task-input-container">
        {props.edit ? (
          <>
            <input
              placeholder="Update task"
              value={input}
              onChange={handleChange}
              name="text"
              className="task-input-edit"
            />
            <button type="submit" className="task-submit-button">
              Update
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Add a task"
              value={input}
              onChange={handleChange}
              name="text"
              className="task-input"            
            />
            <button type="submit" className="task-submit-button">
              Add
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
