var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.render("location");
});

app.get("/results", function (req, res) {
  var city = req.query.city;
  request(
    `http://api.weatherapi.com/v1/forecast.json?key=cd09d4f48222450bba5101129202505&q=${city}&days=7`,
    function (err, response, body) {
      if (!err && response.statusCode == 200) {
        var results = JSON.parse(body);
        res.render("results", { results: results });
      }
    }
  );
});

app.get("/link", (req, res) => {
  var lat = req.query.lat;
  var long = req.query.long;
  request(
    `http://api.weatherapi.com/v1/forecast.json?key=cd09d4f48222450bba5101129202505&q=${lat},${long}&days=7`,
    function (err, response, body) {
      if (!err && response.statusCode == 200) {
        var results = JSON.parse(body);
        res.render("results2", { results: results });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
