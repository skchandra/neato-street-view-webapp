// server.js

// Generate a new instance of express server.
var path = require("path");
var express = require("express");
var app = express();
var request = require("request");
var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('neato_street_view.sqlite');

app.use(express.static(__dirname + '/images'));

// At the root of your website, we show the index.html page
app.get('/', function(req, res) {
  res.sendfile('./public/index_kiki.html')
});

app.listen(process.env.PORT || 3000);

// Database initialization
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='panoramas'",
       function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "panoramas" ' +
           '("i" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"x_coordinate" VARCHAR(255), ' +
           '"y_coordinate" VARCHAR(255), ' +
           '"theta" VARCHAR(255))', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'panoramas' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'panoramas' already initialized.");
  }
});
