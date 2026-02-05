import React, { useEffect, useState } from "react";

const TaskForm = ({ editTask, setEditTask, onTaskSaved }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    duedate: "",
    priority: "low",
  });

  const [errors, setErrors] = useState({});

  // ✏️ Edit mode: fill form
  useEffect(() => {
    if (editTask) {
      setFormData({
        id: editTask.id,
        title: editTask.title,
        description: editTask.description,
        duedate: editTask.dueDate,
        priority: editTask.priority,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editTask]);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // validation
  const validate = () => {
    const newErrors = {};

    if (!formData.id.trim()) newErrors.id = "Task ID is required";
    if (!formData.title.trim()) newErrors.title = "Task title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.duedate) newErrors.duedate = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // clear form
  const handleClear = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      duedate: "",
      priority: "low",
    });
    setErrors({});
    setEditTask(null);
  };

  // submit (add / edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskData = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      dueDate: formData.duedate,
      priority: formData.priority,
      completed: editTask ? editTask.completed : false,
    };

    try {
      let savedTask;

      // ✏️ EDIT
      if (editTask) {
        const res = await fetch(
          `http://localhost:3000/tasks/${editTask.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
          }
        );
        savedTask = await res.json();

        // 🔁 update localStorage
        const storedTasks =
          JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedLocal = storedTasks.map((t) =>
          t.id === savedTask.id ? savedTask : t
        );
        localStorage.setItem("tasks", JSON.stringify(updatedLocal));

        onTaskSaved(savedTask, true);
        setEditTask(null);
      }

      // ➕ ADD
      else {
        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        alert("Task added successfully");
        savedTask = await res.json();

        // 💾 save to localStorage
        const storedTasks =
          JSON.parse(localStorage.getItem("tasks")) || [];
        localStorage.setItem(
          "tasks",
          JSON.stringify([...storedTasks, savedTask])
        );

        onTaskSaved(savedTask, false);
      }

      handleClear();
    } catch (error) {
      console.error("Task save error:", error);
    }
  };

  return (
    <div className="add-task-card">
      <h2 style={{ marginBottom: "15px" }}>
        {editTask ? "Edit Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Task ID */}
        <div>
          <input
            name="id"
            placeholder="Task ID"
            value={formData.id}
            onChange={handleChange}
          />
          {errors.id && <span className="error-msg">{errors.id}</span>}
        </div>

        {/* Title */}
        <div>
          <input
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error-msg">{errors.description}</span>
          )}
        </div>

        {/* Date + Priority */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input
              type="date"
              name="duedate"
              value={formData.duedate}
              onChange={handleChange}
            />
            {errors.duedate && (
              <span className="error-msg">{errors.duedate}</span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div
          className="form-actions"
          style={{ display: "flex", gap: "10px", marginTop: "10px" }}
        >
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            {editTask ? "Update Task" : "Add Task"}
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ flex: 1 }}
            onClick={handleClear}
          >
            {editTask ? "Cancel Edit" : "Clear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;