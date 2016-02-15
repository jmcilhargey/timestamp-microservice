"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(express.logger("dev"));
app.use(express.static(__dirname));
app.use(express.bodyParser());

app.post("/", function(req, res) {
  let date = req.body.info;
  res.json(200, date);
});

app.get("/:date", function(req, res) {
  let date = req.params.date
  res.json(200, { "hello" : date });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Ready!");
});