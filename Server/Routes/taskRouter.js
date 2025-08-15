const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

// POST route to create a new task
router.post("/", async (req, res) => {
  try {
    const { tittle, description, dueDate } = req.body;

    // Validate required fields
    if (!tittle || !description || !dueDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new task
    const newTask = new Task({
      tittle,
      description,
      dueDate,
    });

    // Save task to database
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find and delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
