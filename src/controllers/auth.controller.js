const { config } = require("../config/config");
const Role = require("../models/Role");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });
      user.roles = roles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "customer" });
      if (role) {
        user.roles = [role._id];
      }
    }

    await user.save();
    return res.status(200).json({ msg: "User registered successfully!" });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).populate("roles", "-__v"); // minus to exclude the __v field when populating the user constant
    // another variant would be .populate("roles", "name")

    if (!user) {
      return res.status(404).json({
        msg: "User not found.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      // 401 - Unauthorized
      return res.status(401).json({
        accessToken: null,
        msg: "Invalid password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.key, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};
