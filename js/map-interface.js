var Map = require('./../js/map.js').mapModule;

$(document).ready(function() {
  var map = new Map();
  map.locateUser();
});
