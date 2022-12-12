const express = require("express");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
var mysql = require("mysql");

const router = express.Router();

// const email = "lala@fmail.com";
// const name = "lala";
// const password = "123123";

router.post("/register", (req, res) => {
  console.log("register");

  const { email, name, password } = req.body;
  console.log(req.body);

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
      if (result[0] !== undefined) {
        console.log("result", result);
        res.json({ message: "ser wxista" });
        return con.end();
      }
      //hash password
      bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        var sql =
          "INSERT INTO users (name, email, password) VALUES (' " +
          name +
          "  ', ' " +
          email +
          " ', ' " +
          hashedPassword +
          "')";
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
        res.json({ message: "one user inserterd int database" });
        return con.end();
      });
    });
  });
});

module.exports = router;
