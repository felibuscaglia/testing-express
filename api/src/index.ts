import express from "express";
require('dotenv').config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
