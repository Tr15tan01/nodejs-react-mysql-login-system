const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const session = require("express-session");

const email = "tamuna@fmail.com";
const name = "tamuna";
const password = "123123";

router.get("/info", (req, res) => {
  req.session.counter++;
  console.log(req.session);
  res.json({ message: "this is info page", usermail: req.session.email });
});
module.exports = router;
