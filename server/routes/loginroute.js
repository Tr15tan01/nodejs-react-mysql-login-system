const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const session = require("express-session");

const email = "tamuna@fmail.com";
const name = "tamuna";
const password = "123123";

router.get("/in", (req, res) => {
  console.log(req.session.counter);
  res.json({ message: "this is info page", usermail: req.session.email });
});

router.get("/login", (req, res) => {
  console.log("login");
  var mysql = require("mysql");

  const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
  };

  var con = mysql.createConnection(config);
  var sql = "SELECT * FROM users WHERE email = ' " + email + " '";

  con.connect(function (err) {
    console.log("connected...");
    if (err) throw err;
    con.query(sql, function (err, result) {
      console.log("query managed");
      if (err) {
        console.log(err);
      }

      if (result[0] === undefined) {
        res.json({ message: "user does not exist" });
        return con.end();
      }
      console.log("hashpassword is", result[0].password);
      const hashedPassword = result[0].password.trim();
      const returnedemail = result[0].email;
      //hash password
      bcrypt.compare(password, hashedPassword, function (err, result) {
        console.log(result, password, hashedPassword);
        // const sess = req.session;
        req.session.email = email;
        if (req.session.counter) {
          req.session.counter += 1;
          console.log("session counter", req.session.counter);
        } else {
          req.session.counter = 1;
          console.log("session counter", req.session.counter);
        }
        res.json({
          message: "user exists",
          email: returnedemail,
          loggedin: result,
        });
      });
    });
  });
});

module.exports = router;
