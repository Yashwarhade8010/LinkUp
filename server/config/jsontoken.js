require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET
  );
};

const verifyToken = (token) => {
  return jwt.verify(token);
};

module.exports = {
  generateToken,
  verifyToken,
};
