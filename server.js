var pg = require("pg");

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded());
app.use(express.static("public"));

const port = 8000;

var conString = process.env.SQL;
var client = new pg.Client(conString);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  
    client.connect(function (err) {
      if (err) {
        return console.error("could not connect to postgres", err);
      }
      client.query(
        `INSERT INTO tbl_users(username,password) VALUES ('${req.body.username}','${req.body.password}')`,
        function (err, result) {
          if (err) {
            return console.error("error running query", err);
          }
          res.redirect("/");
          client.end();
        }
      );
       console.log(`printing: ${req.body.username},${req.body.password}`);
    });
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });