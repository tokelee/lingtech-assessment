import { ADD_TASK_CTRL, DELETE_TASK_CTRL, EDIT_TASK_CTRL, READ_ONE_TASK_CTRL, READ_TASKS_CTRL } from "#controllers/task.controller.js";
import express from "express";

const router = express.Router();

router.post("/tasks", ADD_TASK_CTRL);
router.get("/tasks", READ_TASKS_CTRL);
router.get("/tasks/:id", READ_ONE_TASK_CTRL);
router.put("/tasks/:id", EDIT_TASK_CTRL);
router.delete("/tasks/:id", DELETE_TASK_CTRL);

export default router;