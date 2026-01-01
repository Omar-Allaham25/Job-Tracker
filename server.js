require("dotenv").config();
const app = require("./src/app");
const db = require("./src/config/db");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running now on ${PORT}`);
});
