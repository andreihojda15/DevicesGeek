const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const User = require("../models/User");
const Role = require("../models/Role");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    // 403 - server understands the request,
    // but refuses to authorize it
    return res.status(403).json({
      msg: "No token provided",
    });
  }

  jwt.verify(token, config.key, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        msg: "Unauthorized!",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const roles = await Role.find({
      _id: { $in: user.roles }, // match a document that contains one of the role values
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({
      msg: "Require admin role!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const isCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    console.log(req.userId);

    const roles = await Role.find({
      _id: { $in: user.roles }, // match a document that contains one of the role values
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "customer") {
        next();
        return;
      }
    }

    return res.status(403).json({
      msg: "Require customer role!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const isEmployee = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const roles = Role.find({
      _id: { $in: user.roles }, // match a document that contains one of the role values
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "employee") {
        next();
        return;
      }
    }

    return res.status(403).json({
      msg: "Require employee role!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isCustomer,
  isEmployee,
};

module.exports = authJwt;
