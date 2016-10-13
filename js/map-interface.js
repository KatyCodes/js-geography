var apiKey = require('./../.env').apiKey;
var Map = require('./../js/map.js').mapModule;

$('head').append('<script src=\"https://maps.googleapis.com/maps/api/js?key=' + apiKey + '\" async defer></script>');

$(document).ready(function() {

  var map = new Map();
  map.locateUser();

  

});
