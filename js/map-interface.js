var apiKey = require('./../.env').apiKey;

var Map = require('./../js/map.js').mapModule;

$(document).ready(function() {
  $('head').append('<script src=\"https://maps.googleapis.com/maps/api/js?key=' + apiKey + '\" async defer></script>');
  var map = new Map();
  map.locateUser();

});
