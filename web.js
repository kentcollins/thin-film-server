var express = require("express");
var thinfilm = require("./thinfilm.js");
var app = express();
app.use(express.logger());

app.get('/', function(request, response){
  var includetext1='<script src="./thinfilm.js"></script>'
  var includetext2='<script src="http://mathjs.org/js/lib/math.js"></script>';
  response.send(includetext1+includetext2+'Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
