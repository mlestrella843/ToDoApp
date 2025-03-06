import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // ✅ Import path to serve favicon

import taskRoutes from "./routes/tasks.js";  // ✅ Importamos las rutas

dotenv.config(); // Load environment variables

const app = express();

// ✅ Test route to check if the backend is running
app.get("/", (req, res) => {
  res.send("Backend server running successfully 🚀");
});

// 🛠 Middlewares
app.use(cors()); // Allows frontend connections
app.use(express.json()); // Enables reading JSON requests

// ✅ Serve favicon.ico if the browser requests it (to avoid 404 errors in the console)
app.use("/favicon.ico", express.static(path.join(process.cwd(), "public", "favicon.ico")));

// ✅ UUsing routes.js
app.use("/api/tasks", taskRoutes);


// 🚀 Start the server on the specified port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
