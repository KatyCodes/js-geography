var apiKey = require('./../.env').apiKey;
var Map = require('./../js/map.js').mapModule;

$('head').append('<script src=\"https://maps.googleapis.com/maps/api/js?key=' + apiKey + '\" async defer></script>');

$(document).ready(function() {

  var map = new Map();
  map.locateUser();

  $('#start').click(function() {
    map.randomCountry();
    $('#country').html(map.answer);
    $('#instruction').text("Now go to the map and click on the country");
    $('#start').hide();

  });

  $('#next').click(function(){
    map.score = 0;
    $('#score').text('0');
    map.randomCountry();
    $('#country').html(map.answer);
    map.marker.setMap(null);
    $('#instruction').text("Now go to the map and click on the country");
    $(this).hide();
    map.map.setZoom(2);
  });
});
