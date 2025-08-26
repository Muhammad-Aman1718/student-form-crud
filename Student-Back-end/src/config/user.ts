// src/routes/userRoutes.ts
import { Router } from "express";
import { prisma } from "./prisma";

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

export default router;
