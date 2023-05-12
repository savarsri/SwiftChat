const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// mongoDB database connection error handing

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("database connection done");
});

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("GET Request Called");
});
