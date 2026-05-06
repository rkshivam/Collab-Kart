const express = require("express")
const router = express.Router()
const Task = require("../models/task")
const authMiddleware = require("../middleware/auth")

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id

    // Show all availabe tasks
    const allTasks = await Task.find({ assignedTo: userId })

     
    const todo = allTasks.filter(t => t.status === "To Do").length
    const inProgress = allTasks.filter(t => t.status === "In Progress").length
    const done = allTasks.filter(t => t.status === "Done").length

   
    const today = new Date()
    const overdue = allTasks.filter(t => 
      t.dueDate && t.dueDate < today && t.status !== "Done"
    ).length

    res.json({
      totalTasks: allTasks.length,
      todo,
      inProgress,
      done,
      overdue
    })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

module.exports = router