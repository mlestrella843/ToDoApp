
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

export default router
