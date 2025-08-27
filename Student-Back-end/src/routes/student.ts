// src/routes/userRoutes.ts
import { Router } from "express";
import { prisma } from "../config/prisma";
import { log } from "console";

const router = Router();

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    console.log("this is students  --->", students);

    res.status(200).json(students);
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

router.put("/:id", async (req, res) => {
  try {
    console.log("this is params==============>", req);

    const { id } = req.params;
    console.log("this is id  --->", id);

    const updatedStudent = await prisma.student.update({
      where: { id },

      data: req.body,
    });
    console.log("this is updatedStudent  --->", updatedStudent);

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
