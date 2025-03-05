import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middlewares
app.use(cors()); // Permite conexiones desde el frontend
app.use(express.json()); // Permite leer JSON en las solicitudes

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Backend funcionando correctamente 🚀");
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
