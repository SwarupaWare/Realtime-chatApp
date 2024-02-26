const express = require("express");

const { sendMessage, allMessages } = require("../controller/messageController");

const { protect } = require("../config/generateToken");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;