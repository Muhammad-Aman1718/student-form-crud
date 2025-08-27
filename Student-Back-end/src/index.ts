// src/index.ts
import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this");
  res.json({
    message: "Server is running successfully!",
    status: "OK",
  });
});

// User routes ko use karna - '/api/students' base path ke saath
app.use("/api/students", studentRoutes);

// 404 handler - agar koi route nahi mila
// app.use("*", (req, res) => {
//   res.status(404).json({
//     error: "Route not found",
//     message: `Cannot ${req.method} ${req.originalUrl}`,
//   });
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
