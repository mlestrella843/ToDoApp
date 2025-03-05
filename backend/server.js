import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // ✅ Import path to serve favicon

dotenv.config(); // Load environment variables

const app = express();

// 🛠 Middlewares
app.use(cors()); // Allows frontend connections
app.use(express.json()); // Enables reading JSON requests

// ✅ Serve favicon.ico if the browser requests it (to avoid 404 errors in the console)
app.use("/favicon.ico", express.static(path.join(process.cwd(), "public", "favicon.ico")));

// ✅ Test route to check if the backend is running
app.get("/", (req, res) => {
  res.send("Backend server running successfully 🚀");
});

// 🗂 Simulated in-memory database (temporary storage for tasks)
let tasks = [];

// ✅ Route to get all tasks
app.get("/api/tasks", (req, res) => {
  console.log("📡 Request received at /api/tasks");
  res.json(tasks.length > 0 ? tasks : []); // Returns an empty array if no tasks exist
});

// ✅ Route to add a new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body; // Extract the task title from the request body

  if (!title) {
    return res.status(400).json({ message: "Title is required" }); // Return an error if title is missing
  }

  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask); // Store the new task in memory
  res.status(201).json(newTask); // Respond with the created task
});

// 🚀 Start the server on the specified port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
