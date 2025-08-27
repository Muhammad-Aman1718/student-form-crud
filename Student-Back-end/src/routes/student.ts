// src/routes/userRoutes.ts
import { Router } from "express";
import { prisma } from "../config/prisma";

const router = Router();

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

router.post("/", async (req, res) => {
  try {

    const newStudent = await prisma.student.create({
      data: req.body,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
});

router.put("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const updatedStudent = await prisma.student.update({
      where: { id },

      data: req.body,
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

export default router;
