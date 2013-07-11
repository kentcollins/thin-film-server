var express = require("express");
var thinfilm = require("./thinfilm.js");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!'+thinfilm.EM_CONSTANT);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
