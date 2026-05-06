const express = require("express")
const router = express.Router()
const Task = require("../models/task")
const Project = require("../models/project")
const authMiddleware = require("../middleware/auth")

// Task Creation
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority, projectId, assignedTo } = req.body

    
    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

     
    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only admin can create tasks" })
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      project: projectId,
      assignedTo,
      createdBy: req.user.id
    })

    res.status(201).json({ message: "Task created", task })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})


router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")

    res.json(tasks)

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})


router.patch("/:taskId/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body

    const task = await Task.findById(req.params.taskId)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    
    if (
      task.assignedTo.toString() !== req.user.id &&
      task.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    task.status = status
    await task.save()

    res.json({ message: "Status updated", task })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

module.exports = router