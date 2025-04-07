const User = require("../models/user");
const { generateToken } = require("../config/jsontoken");
const passport = require("passport");
const { uploadToCloudinary } = require("../config/cloudinary");

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const image = req.file;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    let Pfp = null;
    if (image) {
      try {
        Pfp = await uploadToCloudinary(image.buffer);
      } catch (err) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    const user = await User.create({
      username,
      profilePic: Pfp,
      email,
      password,
    });

    const token = generateToken(user);
    const userToSend = user.toObject();
    delete userToSend.password;

    return res
      .status(201)
      .json({ message: "User registered successfully", userToSend, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occured" });
  }
};

const handleLogin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const verify = await user.matchPassword(password);

    const userToSend = user.toObject();
    delete userToSend.password;

    if (!verify) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const token = generateToken(user);
      return res
        .status(200)
        .json({ message: "Logged In successfully", userToSend, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occured" });
  }
};

const oAuth = passport.authenticate("google", { scope: ["profile", "email"] });

const oAuthVerify = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/" }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "OAuth authentication failed" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login error" });
      }

      return res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout(() => {
    return res.status(200).json({ message: "Loged out successfully" });
  });
};

module.exports = {
  handleRegister,
  handleLogin,
  oAuth,
  logout,
  oAuthVerify,
};
