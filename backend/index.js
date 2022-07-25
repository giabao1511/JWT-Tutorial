const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "../.env" });
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const connectDB = require("./configs/db.js");
connectDB();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.get("/giabao", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Bao Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});
// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`server is listening on port:http://localhost:${PORT}`)
);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
