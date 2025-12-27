const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "welcome to job tracker api" });
});
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running now on ${PORT}`);
});
