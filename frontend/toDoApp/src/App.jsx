import React from 'react';
import './App.css';
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // ✅ Fetch tasks when the component mounts
  useEffect(() => {
    console.log("🚀 Attempting to load tasks from:", API_URL);
  
    fetch(API_URL)
      .then((res) => {
        console.log("📡 Server response:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Tasks loaded successfully:", data);
        setTasks(data);
      })
      .catch((error) => {
        console.error("❌ Error loading tasks:", error.message);
        alert(`An error occurred while loading tasks: ${error.message}`);
      });
  }, []);

  // ✅ Function to add a new task
  const addTask = () => {  
    if (!newTask.trim()) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    })
    .then((res) => res.json())
    .then((task) => {
        console.log("✅ Task created:", task);
        setTasks([...tasks, task]);
        setNewTask("");
      })
      .catch((err) => console.error("❌ An error occurred:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ✅ Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-3/4 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">To-Do App</h1>

        {/* ✅ Flex container for input & task list */}
        <div className="flex gap-6">
          
          {/* ✅ Left: Input Field */}
          <div className="w-1/3">
            <input 
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button 
              onClick={addTask}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Task
            </button>
          </div>

          {/* ✅ Right: Task List */}
          <div className="w-2/3">
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li 
                  key={task.id} 
                  className="p-3 bg-gray-200 rounded-md flex justify-between items-center"
                >
                  <span>{task.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
