(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyBkWbDaHxh3li0wk6VPELxqclkE_vPeGnA";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Map() {
  this.countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Botswana","Brazil","Bulgaria", "Cameroon","Chad","Chile","China","Colombia","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Russia","Rwanda","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];
  this.score = 0;
  this.userGuess = "";
  this.answer = "";
}


Map.prototype.randomCountry = function() {
  var length = this.countries.length;
  var random = Math.floor(Math.random() * length);
  this.answer = this.countries[random];
};

Map.prototype.locateUser = function() {
  var _this = this;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      _this.map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 2,
        styles: [
          {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
          {elementType: 'labels.text.fill', stylers: [{visibility: 'off'}]},
          {elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#000000'}]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{color: '#ebe3cd'}]
          },
          {
            featureType: 'poi',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'road',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#0077b3'}]
          },
        ]
      });

      _this.map.setOptions({ draggableCursor: 'url("/../img/cursor.png"), auto' });

      _this.map.addListener("click", function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + apiKey).then(function(response){
          response.results["0"].address_components.forEach(function(item) {
            if (item.types.includes('country')) {
              _this.userGuess = item.long_name;
            }
          });
          if (_this.answer.toLowerCase() === _this.userGuess.toLowerCase()) {
            _this.score ++;
            $('#score').text(_this.score);
            $('#instruction').text("Good job! You are a real genius! Now go find:");
            _this.randomCountry();
            $('#country').html(_this.answer);
          } else {
            $('#instruction').text("Sorry, game over! That's " + _this.userGuess + ". See the map for the correct answer. Play again?");
            $('#next').show();
            $('#country').hide();
            var markerPosition;
            $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + _this.answer + '&key=' + apiKey).then(function(response){
              markerPosition = response.results["0"].geometry.location;
              _this.marker = new google.maps.Marker({
                position: markerPosition,
                map: _this.map,
                label: {
                    text: _this.answer,
                    color: 'black',
                    fontFamily: 'Roboto, Arial, sans-serif',
                    fontWeight: 'bolder',
                    fontSize: '2rem'
                  }
              });
              _this.map.setCenter(markerPosition);
              _this.map.setZoom(4);
            });
          }
        });
      });


    }, function(error) {
      $('#map').text(error);
    });
  } else {
    $('#map').text('Please enable location access in your browser. If you choose not to this may affect the performance of the game.');
  }
};

exports.mapModule = Map;

},{"./../.env":1}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
var Map = require('./../js/map.js').mapModule;

$('head').append('<script src=\"https://maps.googleapis.com/maps/api/js?v=3&key=' + apiKey + '\" async defer></script>');

$(document).ready(function() {

  var map = new Map();
  map.locateUser();

  $('#start').click(function() {
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
    function clearMarkers() {
        setMapOnAll(null);
      };
    $('#instruction').text("Now go to the map and click on this country:");
    $('#country').show();
    $(this).hide();
    map.map.setZoom(2);
  });
});

},{"./../.env":1,"./../js/map.js":2}]},{},[3]);
