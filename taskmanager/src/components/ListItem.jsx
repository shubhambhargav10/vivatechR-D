import React from "react";
import TaskForm from "./TaskForm";
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";

function ListItem({
  task,
  completeTask,
  removeTask,
  submitUpdate,
  edit,
  setEdit,
}) {
  return (
    <>
      <div className="task-list-item">
        <div className="task-mark-icon">
          {task.isComplete ? (
            <RiCheckboxCircleFill onClick={() => completeTask(task.id)} />
          ) : (
            <RiCheckboxBlankCircleLine
              onClick={() => completeTask(task.id)}  
            />
          )}
        </div>

        <div className="task-item">
          {task.isComplete ? (
            <p>
              <del>{task.text}</del>
            </p>
          ) : edit.id === task.id ? (
            <TaskForm edit={edit} onSubmit={submitUpdate} />
          ) : (
            <p> {task.text} </p>
          )}
        </div>
      </div>
      <div className="task-icons">
        {!task.isComplete && (
          <MdModeEditOutline
            onClick={() => setEdit({ id: task.id, value: task.text })}
            className="edit-icon"
          />
        )}
        <MdDeleteOutline
          onClick={() => removeTask(task.id)}
          className="delete-icon"
        />
      </div>
    </>
  );
}

ListItem.defaultProps = {
  edit: { id: null, value: "" },
};

export default ListItem;