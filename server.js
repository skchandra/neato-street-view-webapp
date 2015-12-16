// server.js

var path = require("path");
var express = require("express")
    // sqlite3 = require('sqlite3').verbose(),
    // db = new sqlite3.Database('neato_street_view.sqlite');
var app = express();

app.use(express.static('./public'));

app.use(express.static(__dirname + '/images'));

app.get('/', function (req, res){
  res.sendFile(path.join('/index_new.html'));
});

app.listen(process.env.PORT || 3000);
// // Database initialization
// db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='panoramas'",
//        function(err, rows) {
//   if(err !== null) {
//     console.log(err);
//   }
//   else if(rows === undefined) {
//     db.run('CREATE TABLE "panoramas" ' +
//            '("i" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//            '"x_coordinate" VARCHAR(255), ' +
//            '"y_coordinate" VARCHAR(255), ' +
//            '"theta" VARCHAR(255))', function(err) {
//       if(err !== null) {
//         console.log(err);
//       }
//       else {
//         console.log("SQL Table 'panoramas' initialized.");
//       }
//     });
//   }
//   else {
//     console.log("SQL Table 'panoramas' already initialized.");
  // }
// });
