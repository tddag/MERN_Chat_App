const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUserDetails} = require("../controllers/userController")

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/details", getUserDetails);

module.exports = router;