const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");

const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to job tracker API" });
});
app.use(errorHandler);
module.exports = app;
