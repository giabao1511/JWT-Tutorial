const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "../.env" });
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const connectDB = require("./configs/db");
connectDB();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen("8000", () => {
  console.log(`Server is running on port 8000`);
});
