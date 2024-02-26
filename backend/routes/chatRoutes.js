const express = require("express");
const router = express.Router();
const {accessChat, fetchChats,createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controller/chatController");
const {protect} = require("../config/generateToken");

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/renameGroup").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;