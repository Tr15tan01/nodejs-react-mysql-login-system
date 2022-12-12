const express = require("express");
const app = express();
var session = require("express-session");
app.use(express.json());
const bodyParser = require("body-parser");
const registerroute = require("./routes/registerroute");
const loginroute = require("./routes/loginroute");
const inforoute = require("./routes/inforoute");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //to change in production
  })
);

app.use(bodyParser.json());
app.use(registerroute, loginroute, inforoute);

///sql tests

const connection = (name, age, comment) => {
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
    var sql =
      "INSERT INTO items (name, age, comment) VALUES (' " +
      name +
      "  ', ' " +
      age +
      " ', ' " +
      comment +
      "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
};

// connection("booba", 33, "no comment )");

// end of sql tests

app.get("/", (req, res) => {
  res.json({ message: "ill h eh" });
});

app.get("/subdata", (req, res, next) => {
  res.json({ message: "this is a subdata" });
});

app.post("/insert", (req, res) => {
  console.log(req.body);
  const { name, age, comment } = req.body;
  connection(name, age, comment);
  res.json({ message: "posted", data: { name, age, comment } });
});

app.listen(3000, () => {
  console.log("started...");
});
