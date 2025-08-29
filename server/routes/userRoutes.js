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
  handlePostDelete,
  handleLikePost,
  handleSeePost,
  handleCommentOnPost,
  handleFeed,
  handleEditPfp,
} = require("../controllers/user");
const { upload } = require("../config/multer");
const { checkAuth } = require("../middleware/auth");

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
router.post("/register", upload.single("image"), handleRegister);
router.get("/logout", logout);

router.get("/profile/:id", profile);
router.post("/profile/:id", checkAuth, (req, res) => {
  const { action } = req.body;
  if (action == "follow") {
    return handleFollow(req, res);
  }
  if (action == "unfollow") {
    return handleUnFollow(req, res);
  }
});
router.post("/profile/edit", checkAuth, upload.single("image"), handleEditPfp);

router.post(
  "/post/create",
  checkAuth,
  upload.single("image"),
  handleCreatePost
);


router.post("/post/delete", checkAuth, handlePostDelete);
router.post("/post/like/:id", checkAuth, handleLikePost);
router.get("/post/:id", checkAuth, handleSeePost);
router.post("/post/comment", checkAuth, handleCommentOnPost);

router.get("/feed", checkAuth, handleFeed);

module.exports = router;
