import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // 🔄 fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ / ✏️ add or update task in UI
  const handleTaskSave = (task, isEdit) => {
    if (isEdit) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
  };

  // 🚪 logout
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    navigate("/Login");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />

      {/* ADD / EDIT FORM */}
      <TaskForm
        editTask={editTask}
        setEditTask={setEditTask}
        onTaskSaved={handleTaskSave}
      />

      <h1 style={{ margin: "20px 0" }}>MY TASKS</h1>

      {/* TASK LIST */}
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        onEdit={(task) => setEditTask(task)}
      />
    </div>
  );
};

export default Dashboard;