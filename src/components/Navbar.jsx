import React from "react";
import "../index.css";

function Navbar({ onLogout, onAddTaskToggle = true, isAddTAskFormOpen}) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Task Management</h1>
      </div>
      <div className="navbar-actions">
        <button className="btn-primary">Add Task</button>
        <button className="btn-secondary" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
