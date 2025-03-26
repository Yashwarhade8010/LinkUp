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
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return null; // Return null if the token is invalid
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
