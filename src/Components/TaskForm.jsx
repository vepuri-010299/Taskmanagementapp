import React, { useState, useEffect } from "react";
import "./TaskForm.css";

const TaskForm = ({ task, onAddTask, onSubmit, onCancel }) => {
  // Introduce a new state to track the current task being edited
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    status: "Todo",
  });

  // Use useEffect to update the editedTask state when task prop changes
  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation, ensuring the title is not empty
    if (editedTask.title.trim() === "") {
      alert("Please enter a task title.");
      return;
    }
    // Check if it's a new task or an update for an existing task
    if (task) {
      onSubmit({ ...task, ...editedTask });
    } else {
      onAddTask({ ...editedTask });
    }
    // Clear the form fields after submission
    setEditedTask({
      title: "",
      description: "",
      status: "Todo", // Reset status to default after adding/updating
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={editedTask.title}
        onChange={(e) =>
          setEditedTask({ ...editedTask, title: e.target.value })
        }
      />
      <textarea
        placeholder="Task Description"
        value={editedTask.description}
        onChange={(e) =>
          setEditedTask({ ...editedTask, description: e.target.value })
        }
      />
      <select
        value={editedTask.status}
        onChange={(e) =>
          setEditedTask({ ...editedTask, status: e.target.value })
        }
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">{task ? "Update Task" : "Add Task"}</button>
      {task && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
