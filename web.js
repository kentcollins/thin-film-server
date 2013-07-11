var express = require("express");
var thinfilm = require("./thinfilm.js");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  var s = new thinfilm.Source("IR", 1.5, 0.0);
  response.send('Hello World! >'+s);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
