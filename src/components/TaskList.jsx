import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div className="task-grid">
      {/*Task card 1 */}
      {tasks.map((task) => (
        <div className="task-card" style={{ position: "relative" }}>
        <h3 >{task.title}</h3>
        <p>{task.description}</p>

        <div className="task-meta">
          <span>Due: {task.dueDate}</span>
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>

        <div className="task-actions">
          <button
            className="btn-icon"
            style={{ background: "#00d2ff" }}
            title="Edit Task"
          >
            ✏️
          </button>

          <button
            className="btn-icon"
            style={{ background: "#00b894" }}
            title="Mark Complete"
          >
            ✔️
          </button>

          <button
            className="btn-icon"
            style={{ background: "red" }}
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>))}
      
    </div>
  );
};

export default TaskList;
