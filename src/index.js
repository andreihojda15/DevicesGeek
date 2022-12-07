const express = require("express");
const { connect, config } = require("./config/config");
const app = express();
const cors = require("cors");
const Role = require("./models/Role");
const roles = require("./roles/roles");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

// TO-DO: modifiy origin when integrating with frontend
const options = {
  origin: config.origin,
};

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: roles.Customer,
      }).save();
      new Role({
        name: roles.Admin,
      }).save();
      new Role({
        name: roles.Employee,
      }).save();
    }
  });
};

connect()
  .then(() => initial())
  .catch((err) => console.log(err));

app.use(cors(options));
app.use(express.json());

authRoutes(app);
userRoutes(app);

app.get("/", (req, res) => {
  return res.send(`Hi from root!`);
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
