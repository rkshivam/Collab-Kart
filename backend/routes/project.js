const express = require("express")
const router = express.Router()
const Project = require("../models/project")
const authMiddleware = require("../middleware/auth")

// Project creation 
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body

    const project = await Project.create({
      name,
      description,
      admin: req.user.id,
      members: [req.user.id]
    })

    res.status(201).json({ message: "Project created", project })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// All Projects 
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("admin", "name email")

    res.json(projects)

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// Member addition
router.post("/:projectId/add-member", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body

    const project = await Project.findById(req.params.projectId)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // - only admin can add
    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only admin can add members" })
    }

    project.members.push(userId)
    await project.save()

    res.json({ message: "Member added", project })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

module.exports = router