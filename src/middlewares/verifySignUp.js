const roles = require("../roles/roles");
const User = require("../models/User");
const Role = require("../models/Role");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({
      username: req.body.username,
    });
    if (userByUsername) {
      return res.status(400).json({
        msg: "Username is already in use!",
      });
    }

    const userByEmail = await User.findOne({
      email: req.body.email,
    });

    if (userByEmail) {
      return res.status(400).json({
        msg: "Email is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const checkRolesExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Object.values(roles).includes(req.body.roles[i])) {
        return res.status(400).json({
          msg: `Incorrect role: ${req.body.roles[i]} doesn't exist!`,
          roles: Object.values(roles),
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExist,
};

module.exports = verifySignUp;
