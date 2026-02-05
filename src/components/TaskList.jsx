import React from "react";

const TaskList = ({ tasks, setTasks, onEdit }) => {

  // ✔️ Complete / Incomplete
  const handleToggleComplete = async (task) => {
    try {
      const res = await fetch(
        `http://localhost:3000/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !task.completed }),
        }
      );

      const updatedTask = await res.json();

      // update state
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));

      // update localStorage
      const stored = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedLocal = stored.map(t =>
        t.id === task.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedLocal));

    } catch (err) {
      console.error(err);
    }
  };

  // 🗑️ DELETE (FIXED)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      // 1️⃣ delete from json-server
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });

      // 2️⃣ update state
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);

      // 3️⃣ update localStorage
      const storedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedLocal = storedTasks.filter(task => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedLocal));

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-card"
          style={{ opacity: task.completed ? 0.6 : 1 }}
        >
          <h3 style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.title}
          </h3>

          <p>{task.description}</p>

          <div className="task-meta">
            <span>Due: {task.dueDate}</span>
            <span className={`priority-badge priority-${task.priority}`}>
              {task.priority}
            </span>
          </div>

          <div className="task-actions">
            {/* ✏️ EDIT */}
            <button
              className="btn-icon"
              style={{ background: "#00d2ff" }}
              onClick={() => onEdit(task)}
            >
              ✏️
            </button>

            {/* ✔️ COMPLETE */}
            <button
              className="btn-icon"
              style={{ background: "#00b894" }}
              onClick={() => handleToggleComplete(task)}
            >
              ✔️
            </button>

            {/* 🗑️ DELETE */}
            <button
              className="btn-icon"
              style={{ background: "#ff416c" }}
              onClick={() => handleDelete(task.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;