require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => console.error(err.message));

mongoose.set("debug", true);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running at port: 3001");
});
