const { Router } = require("express");

const {
  oAuth,
  logout,
  handleLogin,
  handleRegister,
  oAuthVerify,
} = require("../controllers/auth");
const {
  profile,
  handleFollow,
  handleUnFollow,
  handleCreatePost,
} = require("../controllers/user");
const { upload } = require("../config/multer");

const router = Router();

//Auth routes
router.get("/auth/google", oAuth);
router.get("/auth/google/callback", oAuthVerify);
router.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.send(`Hello, ${req.user.displayName}`);
});
router.post("/login", handleLogin);
router.post("/register", handleRegister);
router.get("/logout", logout);

router.get("/profile/:id", profile);
router.post("/profile/:id", (req, res) => {
  const { action } = req.body;
  if (action == "follow") {
    return handleFollow(req, res);
  }
  if (action == "unfollow") {
    return handleUnFollow(req, res);
  }
});

router.post("/post/create", upload.single("image"), handleCreatePost);

module.exports = router;
