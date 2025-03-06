
import express from "express";
const router = express.Router();

// 🗂 Simulated in-memory database (temporary storage for tasks)
let tasks = [];

// ✅ Route to get all tasks
router.get("/", (req, res) => {
  console.log("📡 Request received at /api/tasks");
  res.json(tasks.length > 0 ? tasks : []); // Returns an empty array if no tasks exist
});

// ✅ Route to add a new task
router.post("/", (req, res) => {
  const { title } = req.body; // Extract the task title from the request body

  if (!title) {
    return res.status(400).json({ message: "Title is required" }); // Return an error if title is missing
  }

  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask); // Store the new task in memory
  res.status(201).json(newTask); // Respond with the created task
});

router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id); // Convert the ID to a number

  // Find the index of the task in the array
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  // If the task is not found, return a 404 error
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Remove the task from the array
  tasks.splice(taskIndex, 1);

  // Send a success response
  res.status(200).json({ message: "Task deleted successfully" });
});
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id); // Convert the ID to a number
  const { title } = req.body; // Extract the new title from the request body

  // Find the task in the array
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  // If the task is not found, return a 404 error
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }


  // Validate the new title
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  // Update the task title
  tasks[taskIndex].title = title;

  // Send a success response with the updated task
  res.status(200).json(tasks[taskIndex]);
});


export default router
