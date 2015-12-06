// server.js

// Generate a new instance of express server.
var express = require('express'), 
	http = require('http'),
	fs = require("fs"),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('neato_street_view.sqlite');

var app = express();

app.use(express.static(__dirname + '/images'));

var port = process.env.PORT || 5000;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app).listen(port, host, function() {
  console.log("Server listening to %s:%d within %s environment",
              host, port, app.get('env'));
});

// At the root of your website, we show the index.html page
app.get('/', function(req, res) {
  res.sendfile('./public/index.html')
});

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

