const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

// Signup the user store credentials inside DB
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    })

    res.status(201).json({ message: "User created successfully" })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})


// After Signup Now Login With the credenatials saved

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token, role: user.role, name: user.name })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

module.exports = router