const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/db.config");
const cors = require("cors");
const taskRoutes = require("./Routes/taskRouter");

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
});
