var apiKey = require('./../.env').apiKey;

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

      this.map.addListener("click", function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + apiKey, function(response){
          var country = '';
          response.results["0"].address_components.forEach(function(item) {
            if (item.types.includes('country')) {
              country = item.long_name;
            }
          });
          this.userCountry = country;
          $("#countryClicked").html(country);
        });
      });


    }, function(error) {
      $('#map').text(error);
    });
  } else {
    $('#map').text('Please enable location access in your browser.');
  }
};

exports.mapModule = Map;
