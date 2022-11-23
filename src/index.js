const express = require("express");
const connect = require("./config/database");
const app = express();
require("dotenv").config();

connect().catch((err) => console.log(err));

app.use(express.json());

app.get("/", (req, res) => {
  return res.send(`Hi from root!`);
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
