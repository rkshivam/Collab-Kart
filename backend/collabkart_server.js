require('dotenv').config()
const express = require("express");
const cors = require("cors")
const connectDB = require("./config/dbconnection");
const authRouter = require("./routes/auth")
const projectRouter = require("./routes/project")
const taskRouter = require("./routes/task")
const dashboardRouter = require("./routes/dashboard")

const app = express();

app.use(cors());
app.use(express.json());

//Authentication router
app.use('/api/auth',authRouter);

// All other routers
app.use('/api/projects',projectRouter);
app.use('/api/tasks',taskRouter);
app.use('/api/dashboard',dashboardRouter);


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`collabkart server started successfully on port ${PORT}`)
  })
})