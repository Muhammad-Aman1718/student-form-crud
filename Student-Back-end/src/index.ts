// src/index.ts
import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully!",
    status: "OK",
  });
});

app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
