// var apiKey = require('./../.env').apiKey;

function Map() {
}

Map.prototype.locateUser = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 8
      });
      this.marker = new google.maps.Marker({
          position: pos,
          icon: '/img/pin.png',
          map: this.map
        });
    }, function(error) {
      $('#map').text(error);
    });
  } else {
    $('#map').text('Please enable location access in your browser.');
  }
};

exports.mapModule = Map;
