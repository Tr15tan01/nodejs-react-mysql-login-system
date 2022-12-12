const bcrypt = require("bcrypt");
const saltRounds = 10;

// sql

const loginController = (email, password) => {
  var mysql = require("mysql");

  const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
  };

  var con = mysql.createConnection(config);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    const myPlaintextPassword = password;
    bcrypt.hash(
      myPlaintextPassword,
      saltRounds,
      function (err, hashedPassword) {
        // Store hash in your password DB.
        console.log(hashedPassword);
        var sql = "SELECT * FROM users WHERE email = ' " + email + " '";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record found", result);
        });
      }
    );
  });
};

module.exports = loginController;
