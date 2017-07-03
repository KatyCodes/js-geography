var apiKey = require('./../.env').apiKey;
var Map = require('./../js/map.js').mapModule;

$('head').append('<script src=\"https://maps.googleapis.com/maps/api/js?v=3&key=' + apiKey + '\" async defer></script>');

$(document).ready(function() {

  var map = new Map();


  $('#start').click(function() {
    map.playGame();

    $('.intro').toggle();
    map.randomCountry();
    $('#country').html(map.answer);
    $('#instruction').text("Now go to the map and click on this country:");
    $('#country').show();
    $('#start').hide();
    $('#scorediv').css('display', 'inline-flex');
    $('#map').show();
    $('html, body').animate({scrollTop:10000}, 8000);
  });

  $('#next').click(function(){
    map.score = 0;
    $('#score').text('0');
    map.randomCountry();
    $('#country').html(map.answer);
    map.marker.setMap(null);
    $('#instruction').text("Now go to the map and click on this country:");
    $('#country').show();
    $(this).hide();
    map.map.setZoom(2);
  });
});
