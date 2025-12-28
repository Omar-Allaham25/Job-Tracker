const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "welcome to job tracker api" });
});
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);

app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running now on ${PORT}`);
});
