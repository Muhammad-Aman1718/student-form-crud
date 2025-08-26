// src/routes/userRoutes.ts
import { Router } from "express";
import { prisma } from "../config/prisma";

const router = Router();

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.student.findMany();
    console.log("this is users  --->", users);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await prisma.student.create({
      data: req.body,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
