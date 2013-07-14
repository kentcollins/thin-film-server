var express = require("express");
var app = express();

app.configure(function(){
app.use('/public', express.static(__dirname + '/public'));
app.use(express.logger());
});

app.get('/', function(request, response){
  response.send('<script src="/public/bundle.js"></script>');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
