const { config } = require("../config/config");

const auth = (roles = []) => {
  // if roles is a string,
  //convert it into an array with a single string
  if (typeof roles == "string") {
    roles = [roles];
  }


};

module.exports = auth;
