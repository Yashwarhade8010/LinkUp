const { verifyToken } = require("../config/jsontoken");
require("dotenv").config()
const checkAuth = async(req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const user = verifyToken(token, process.env.SECRET);
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
  }

  try {
    const user = (
      await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
        { method: "get" }
      )
    ).json();
    req.user = user;
    return next();
  } catch (err) {
    return res.status(400).json({ message: "Unauthorized access" });
  }
}

module.exports = {
    checkAuth
}