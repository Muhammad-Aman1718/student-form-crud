// src/routes/userRoutes.ts
import { Router } from "express";
import { prisma } from "../config/prisma";

const router = Router();

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    console.log("this is students  --->", students);

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("this is post api", req.body);

    const newStudent = await prisma.student.create({
      data: req.body,
    });
    console.log("this is req.body  --->", req.body);

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
});

export default router;
