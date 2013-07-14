var math = require('mathjs');
var thinfilm = require('thinfilm');
var $ = require('./jquery-2.0.2.min.js');

$(document).ready(function() {
  var source = new thinfilm.Source("Visible", .5893, 0);
  var layer1 = new thinfilm.Layer("Air", 1.0, 0);
  var layer2 = new thinfilm.Layer("ZrO2", 2.10, 0.04);
  var layer3 = new thinfilm.Layer("Glass", 1.52, 0);
  var layers = [];
  layers.push(layer1);
  layers.push(layer2);
  layers.push(layer3);
  var system = new thinfilm.System(source, layers);
  document.write("I made it "+system.reflectance);
});

