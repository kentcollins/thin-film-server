(function() {
/**
 * Define namespace
 */
var thinfilm = {
    type: {},
    expr: {
        node: {
            handlers: {}
        }
    },
    docs: {},
    options: {
        precision: 5  // number of digits in formatted output
    }
};

var math = require('mathjs');
var PERMITTIVITY = 8.854157e-12;
var PERMEABILITY = 4e-7 * Math.PI;
var EM_CONSTANT = Math.sqrt(PERMITTIVITY*PERMEABILITY);

// wavelength is measured in free space, in microns
// angle measured in air -- if air is not the originating
// substance, must correct and provide the equivalent
function Source(name, wavelength, angle) {
  this.name = name;
  this.wavelength = wavelength;
  this.angle = angle;
}
thinfilm.Source = Source;

function Layer(name, index, thickness){
  this.name = name;
  this.index = index;
  this.thickness = thickness;
}
thinfilm.Layer = Layer;

function System(source, layers){
  this.source = source;
  this.layers = layers;
  this.matrix = getSystemTransferMatrix(this);
  this.reflectance = getSystemReflectance(this);
}
thinfilm.System = System;

function getAngleInLayer(source, layer){
  return Math.asin(Math.sin(source.angle)/layer.index);
}
thinfilm.getAngleInLayer = getAngleInLayer;

function getGamma(source, layer){
  var angle = getAngleInLayer(source, layer);
  return layer.index*EM_CONSTANT*Math.cos(angle);
}
thinfilm.getGamma = getGamma;

// phase difference for single layer
// assumes the radiation source expresses wavelength in vacuum
// and angle as equivalent angle in air
function getPhaseDifference(source, layer){
  var angle = getAngleInLayer(source, layer);
  var n = layer.index;
  var opd = n * layer.thickness * Math.cos(angle);
  var k = 2*Math.PI/source.wavelength;
  var shift = k * opd;
  return shift;
}
thinfilm.getPhaseDifference = getPhaseDifference;

function getLayerTransferMatrix(source, layer){
  var angle = getAngleInLayer(source, layer);
  var gamma = getGamma(source, layer);
  var delta = getPhaseDifference(source, layer);
  var m11 = math.complex(Math.cos(delta),0);
  var m12 = math.complex(0, Math.sin(delta)/gamma);
  var m21 = math.complex(0, gamma*Math.sin(delta));
  var m22 = math.complex(Math.cos(delta),0);
  var matrix = math.matrix([[m11, m12],[m21, m22]]);
  return matrix;
}
thinfilm.getLayerTransferMatrix = getLayerTransferMatrix;

function getSystemTransferMatrix(system) {
  var layers = system.layers;
  var source = system.source;
  var transfer = math.matrix([[1,0],[0,1]]);
  for (var i = 1; i<layers.length-1; i++) {
    var m = getLayerTransferMatrix(source, layers[i]);
    transfer = math.multiply(transfer, m);
  }
  return transfer;
}
thinfilm.getSystemTransferMatrix = getSystemTransferMatrix;

function getSystemReflectance(system){
  var layers = system.layers;
  var gamma0 = getGamma(source, layers[0]);
  var gammaS = getGamma(source, layers[layers.length-1]);
  var m11 = system.matrix.get([1,1]);
  var m12 = system.matrix.get([1,2]);
  var m21 = system.matrix.get([2,1]);
  var m22 = system.matrix.get([2,2]);
  var term1 = math.multiply(gamma0, m11);
  var term2 = math.multiply(math.multiply(gamma0, m12),gammaS);
  var term3 = m21;
  var term4 = math.multiply(gammaS, m22);
  var n = math.subtract(math.subtract(math.add(term1,term2),term3),term4);
  var d =math.add(math.add(math.add(term1, term2),term3),term4);
  var r = math.divide(n, d);
  var R = math.multiply(r, math.conj(r)).re;
  return R;
}
thinfilm.getSystemReflectance = getSystemReflectance;

function getQuarterThickness(wavelength, index){
  return wavelength/index/4;
}
thinfilm.getQuarterThickness = getQuarterThickness;

function getHalfThickness(wavelength, index){
  return wavelength/index/2;
}
thinfilm.getHalfThickness = getHalfThickness;

/**
 * CommonJS module exports
 */
if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = thinfilm;
}
if (typeof exports !== 'undefined') {
    exports = thinfilm;
}

/**
 * AMD module exports
 */
if (typeof(require) != 'undefined' && typeof(define) != 'undefined') {
    define(function () {
        return thinfilm;
    });
}

/**
 * Browser exports
 */
if (typeof(window) != 'undefined') {
    if (window['thinfilm']) {
        util.deepExtend(window['thinfilm'], thinfilm);
    }
    else {
        window['thinfilm'] = thinfilm;
    }
}

})();
