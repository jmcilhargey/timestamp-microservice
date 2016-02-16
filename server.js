"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

app.use(express.logger("dev"));
app.use(express.static(__dirname));
app.use(express.bodyParser());

app.post("/", function(req, res) {
  var date = req.body.info;
  
  if (isNaN(date)) {
    var unixTime = new Date(date).getTime() / 1000;
    
    res.json({ unix: unixTime, standard: date })
  }
  
  if (/\d{8}/.test(date)) {
    var standardTime = new Date(date * 1000);
    var month = standardTime.getMonth();
    var day = standardTime.getDate();
    var year = standardTime.getFullYear();
    
    res.json({ unix: date, standard: months[month] + ", " + day + " " + year })
  }
  
});

app.get("/:date", function(req, res) {
  var date = req.params.date

  if (isNaN(date)) {
    var unixTime = new Date(date).getTime() / 1000;
    
    res.json({ unix: unixTime, standard: date })
  }
  
  if (/\d{8}/.test(date)) {
    var standardTime = new Date(date * 1000);
    var month = standardTime.getMonth();
    var day = standardTime.getDate();
    var year = standardTime.getFullYear();
    
    res.json({ unix: date, standard: months[month] + ", " + day + " " + year })
  }
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Ready! Listening on port " + process.env.PORT);
});