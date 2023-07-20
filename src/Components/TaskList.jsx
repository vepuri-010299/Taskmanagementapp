import React, { useState } from "react";
import TaskForm from "./TaskForm";
import "./TaskList.css";
import * as XLSX from "xlsx";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedList, setSelectedList] = useState("Todo"); // Default list

  // Function to add a new task to the list
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to update a task in the list
  const handleUpdateTask = (updatedTask, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setEditingTask(null); // Clear the editing state
  };

  // Function to delete a task from the list
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Function to move a task to another list
  const handleMoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = selectedList;
    setTasks(updatedTasks);
  };
  // Function to export the task list to Excel
  const handleExportToExcel = () => {
    const data = tasks.map((task) => ({
      Title: task.title,
      Description: task.description,
      Status: task.status,
    }));

    const sheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Task List");

    // Generate the Excel file and trigger download
    XLSX.writeFile(workbook, "task_list.xlsx");
  };

  return (
    <div>
      {/* Display the list of tasks */}
      {tasks.map((task, index) => (
        <div key={index}>
          {editingTask === index ? (
            // Display an editable form for the task being edited
            <TaskForm
              task={task}
              onSubmit={(updatedTask) => handleUpdateTask(updatedTask, index)}
              onCancel={() => setEditingTask(null)}
            />
          ) : (
            // Display the task details and buttons for editing/deleting/moving
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => setEditingTask(index)}>Edit</button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={() => handleMoveTask(index)}>Move</button>
            </>
          )}
        </div>
      ))}

      {/* Add TaskForm to allow users to add new tasks */}
      <TaskForm onAddTask={handleAddTask} />
      <button onClick={handleExportToExcel}>Export to Excel</button>
    </div>
  );
};

export default TaskList;
