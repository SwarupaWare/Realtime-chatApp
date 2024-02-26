const express = require("express");
const router = express.Router();
const multer = require("multer");

const { registerUser, authUser, allUsers } = require("../controller/userController");
const { protect } = require("../config/generateToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" +file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid image type"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// in the server.js we have app.use which consume userRoutes. The login will append to that url
// like /api/user/login, we can also chain the api calls like router.route('/login').get(()=>{})/post(()=>{})

// for get : all users > first it will verify the token by executing protech method and then only execute allUsers
router.route("/").post(upload.single("pic"), registerUser).get(protect, allUsers);

// here we can't chain
// router.post("/login").post(authUser);
router.route("/login").post(authUser);

module.exports = router;
